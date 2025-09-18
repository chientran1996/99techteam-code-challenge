import crypto from "node:crypto";
import { env } from "./config";
import { redis } from "./redis";

export function verifySignature(ts: string, signature: string, rawBody: Buffer) {
    const t = Number(ts);
    if (!Number.isFinite(t)) return false;
    const skew = Math.abs(Date.now() - t);
    if (skew > 5 * 60 * 1000) return false; // 5 minutes

    const msg = Buffer.concat([Buffer.from(String(t)), Buffer.from("."), rawBody]);
    const expected = crypto.createHmac("sha256", env.ACTION_WEBHOOK_SECRET).update(msg).digest("hex");
    const provided = (signature || "").split("=")[1] || signature;
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(provided, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function useIdempotency(key?: string | null) {
    if (!key) return false;
    const ok = await redis.set(`idem:${key}`, "1", "EX", 60 * 60 * 24, "NX"); // 24h
    return ok === "OK";
}