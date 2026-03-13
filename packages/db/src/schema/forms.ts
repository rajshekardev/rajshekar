import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const roleEnum = [
	"Student",
	"intern",
	"Working",
	"Looking for job",
] as const;

export const contactForm = sqliteTable("contactForm", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	phone: text("phone").notNull(),
	email: text("email").notNull(),
	currentRole: text("currentRole", { enum: roleEnum })
		.default("Student")
		.notNull(),
	message: text("message").notNull(),

	ipAddr: text("ipAddr").notNull(),
	userAgent: text("userAgent").notNull(),
	honeypot: text("honeypot"),
	referrer: text("referrer"),

	createdAt: integer("createdAt", { mode: "timestamp" })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
});
