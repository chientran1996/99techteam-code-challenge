import { Router } from "express";
import { getTop } from "../services/leaderboard";

const router = Router();

router.get("/top", async (req, res) => {
    const limit = Math.min(Number(req.query.limit ?? 10), 100);
    const items = await getTop(limit);
    res.json({ limit, items, last_updated: new Date().toISOString() });
});

export default router;