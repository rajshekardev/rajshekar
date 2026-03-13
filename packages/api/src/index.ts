/** biome-ignore-all lint/suspicious/noExplicitAny: explanation> */
import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	return next({
		context: {
			session: context.session,
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);

const requireAdmin = o.middleware(async ({ context, next }) => {
	if ((context as any).session?.user?.role !== "admin") {
		throw new ORPCError("FORBIDDEN", {
			message: "Admin access required",
		});
	}
	return next({
		context: {
			session: (context as any).session,
		},
	});
});

export const adminProcedure = protectedProcedure.use(requireAdmin);
