import { env } from "@rajshekar/env/server";
import { Resend } from "resend";

export async function sendOtpEmail({
	email,
	otp,
}: {
	email: string;
	otp: string;
}): Promise<void> {
	const resend = new Resend(env.RESEND_API_KEY);

	await resend.emails.send({
		from: "Admin Auth <onboarding@resend.dev>",
		to: email,
		subject: "Your Login OTP",
		html: `<p>Your one-time password is: <strong>${otp}</strong></p>`,
	});
}
