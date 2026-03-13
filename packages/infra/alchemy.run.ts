/** biome-ignore-all lint/style/noNonNullAssertion: explanation> */
import alchemy from "alchemy";
import { Astro, D1Database, Worker } from "alchemy/cloudflare";

const app = await alchemy("rajshekar");

const db = await D1Database("database", {
	migrationsDir: "../db/src/migrations",
});

export const server = await Worker("server", {
	cwd: "../../apps/server",
	entrypoint: "./src/index.ts",
	compatibility: "node",
	domains: ["api.rajshekar.dev"],
	bindings: {
		DB: db,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
		ADMIN_USER_ID: alchemy.secret.env.ADMIN_USER_ID!,
		RESEND_API_KEY: alchemy.secret.env.RESEND_API_KEY!,
	},
	dev: {
		port: 4000,
	},
});

export const web = await Astro("ui", {
	cwd: "../../apps/ui",
	entrypoint: "dist/server/entry.mjs",
	assets: "dist/client",
	domains: ["rajshekar.dev"],
	bindings: {
		PUBLIC_SERVER_URL: alchemy.env.PUBLIC_SERVER_URL!,
	},
});

console.log(`Server -> ${server.url}`);
console.log(`Web -> ${web.url}`);

console.log(`Server -> ${server.domains}`);
console.log(`Web -> ${web.domains}`);

await app.finalize();
