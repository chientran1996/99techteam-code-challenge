import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard";
import { scoreUpdate } from "./handlers/scoreUpdate";

const app = express();
app.use(cors());

// raw body ONLY for webhook route
app.post("/actions/score-update", express.raw({ type: "application/json" }), scoreUpdate);

// JSON for all other routes
app.use(express.json());
app.use(express.static("public"));

app.use("/leaderboard", leaderboardRouter);
app.get("/", (_req, res) => res.send("OK"));
export default app;