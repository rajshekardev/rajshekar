import { db } from "@rajshekar/db";
import { contactForm, roleEnum } from "@rajshekar/db/schema/forms";
import { eq } from "drizzle-orm";
import * as z from "zod";

import { adminProcedure, publicProcedure } from "../index";

export const formRouter = {
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1).max(100),
				phone: z.string().min(10).max(20),
				email: z.email(),
				currentRole: z.enum(roleEnum),
				message: z.string(),
				ipAddr: z.string(),
				userAgent: z.string(),
				honeypot: z.string().optional(),
				referrer: z.string().optional(),
			}),
		)
		.handler(async ({ input }) => {
			return await db.insert(contactForm).values({
				...input,
				id: crypto.randomUUID(),
				createdAt: new Date(),
			});
		}),
	getAll: adminProcedure.handler(async () => {
		return await db.select().from(contactForm);
	}),
	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return await db.delete(contactForm).where(eq(contactForm.id, input.id));
		}),
};
