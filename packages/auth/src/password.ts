import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
	return `${salt}:${hash}`;
}

export async function verifyPassword({
	password,
	hash,
}: {
	password: string;
	hash: string;
}): Promise<boolean> {
	const [salt, storedHash] = hash.split(":");
	if (!salt || !storedHash) return false;
	const derived = scryptSync(password, salt, SCRYPT_KEYLEN);
	return timingSafeEqual(derived, Buffer.from(storedHash, "hex"));
}
