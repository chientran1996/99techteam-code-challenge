import { Request, Response } from "express";
import { getTop } from "../services/leaderboard";

// List top leaderboard
export const getTopLeaderboard = async (req: Request, res: Response) => {
    const limit = Math.min(Number(req.query.limit ?? 10), 100);
    const items = await getTop(limit);
    res.json({ limit, items, last_updated: new Date().toISOString() });
};