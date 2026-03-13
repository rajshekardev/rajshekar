import { db } from "@rajshekar/db";
import * as schema from "@rajshekar/db/schema/auth";
import { env } from "@rajshekar/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { hashPassword, verifyPassword } from "./password";
import { plugins } from "./plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
	}),

	databaseHooks: {
		user: {
			create: {
				before: () => {
					throw new Error("Public registration is disabled.");
				},
			},
		},
	},

	trustedOrigins: [
		env.CORS_ORIGIN,
		"rajshekar://",
		"exp://",
		"exp://**",
		"exp://192.168.*.*:*/**",
		"http://localhost:8081",
	],

	emailAndPassword: {
		enabled: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
	},

	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,

	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},

	plugins,
});
