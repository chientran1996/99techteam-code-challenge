import type { Request, Response } from "express";
import { verifySignature, useIdempotency } from "../security";
import { applyScoreIncrease } from "../services/score";

export async function scoreUpdate(req: Request, res: Response) {
    const ts = String(req.header("X-Timestamp") || "");
    const sig = String(req.header("X-Signature") || "");
    const idem = String(req.header("Idempotency-Key") || "");

    // req.body is Buffer (raw) for this route
    if (!verifySignature(ts, sig, req.body as Buffer)) {
        return res.status(401).json({ error: "invalid signature or timestamp" });
    }

    const firstTime = await useIdempotency(idem);
    if (!firstTime) return res.json({ ok: true, idempotent: true });

    try {
        const payload = JSON.parse((req.body as Buffer).toString("utf8"));
        await applyScoreIncrease(payload);
        return res.json({ ok: true });
    } catch (e: any) {
        // Prisma unique violation => duplicate action for user
        if (e?.code === "P2002") return res.status(409).json({ error: "duplicate action" });
        console.error(e);
        return res.status(500).json({ error: "internal_error" });
    }
}