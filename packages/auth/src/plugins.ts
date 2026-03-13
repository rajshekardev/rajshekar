import { randomBytes } from "node:crypto";
import type { BetterAuthPlugin } from "@better-auth/core";
import { expo } from "@better-auth/expo";
import { env } from "@rajshekar/env/server";
import { createAuthMiddleware } from "better-auth/api";
import { deleteSessionCookie } from "better-auth/cookies";
import { admin, bearer, twoFactor } from "better-auth/plugins";

import { sendOtpEmail } from "./email";

const TWO_FACTOR_COOKIE_NAME = "two_factor";
const TWO_FACTOR_COOKIE_MAX_AGE_SECONDS = 10 * 60;

const mandatoryEmailOtpPlugin = {
	id: "mandatory-email-otp",
	hooks: {
		after: [
			{
				matcher(context: { path?: string }) {
					return context.path === "/sign-in/email";
				},
				handler: createAuthMiddleware(async (ctx) => {
					const newSession = ctx.context.newSession as
						| {
								session: { token: string };
								user: { id: string; twoFactorEnabled?: boolean | null };
						  }
						| undefined;

					// If there's no session or 2FA is already enabled, do nothing
					if (!newSession || newSession.user.twoFactorEnabled) {
						return;
					}

					// Tear down the fresh session so the user must complete 2FA first
					deleteSessionCookie(ctx, true);
					await ctx.context.internalAdapter.deleteSession(
						newSession.session.token,
					);

					// Create a short-lived verification entry tied to a signed cookie
					const identifier = `2fa-${randomBytes(16).toString("hex")}`;
					const twoFactorCookie = ctx.context.createAuthCookie(
						TWO_FACTOR_COOKIE_NAME,
						{ maxAge: TWO_FACTOR_COOKIE_MAX_AGE_SECONDS },
					);

					await ctx.context.internalAdapter.createVerificationValue({
						value: newSession.user.id,
						identifier,
						expiresAt: new Date(
							Date.now() + TWO_FACTOR_COOKIE_MAX_AGE_SECONDS * 1000,
						),
					});

					await ctx.setSignedCookie(
						twoFactorCookie.name,
						identifier,
						ctx.context.secret,
						twoFactorCookie.attributes,
					);

					return ctx.json({ twoFactorRedirect: true });
				}),
			},
		],
	},
} satisfies BetterAuthPlugin;

export const plugins = [
	expo(),
	admin({
		adminUserIds: [env.ADMIN_USER_ID],
	}),
	bearer(),
	twoFactor({
		otpOptions: {
			async sendOTP({ user, otp }) {
				await sendOtpEmail({ email: user.email, otp });
			},
		},
	}),
	mandatoryEmailOtpPlugin,
];
