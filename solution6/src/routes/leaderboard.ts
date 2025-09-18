import { Router } from "express";
import { getTopLeaderboard } from "../controllers/leaderboardController";

const router = Router();

router.get("/top", getTopLeaderboard);

export default router;