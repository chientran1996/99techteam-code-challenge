import { z } from "zod";
import { prisma } from "../prisma";
import { incrementScore, getTop } from "./leaderboard";
import { emitLeaderboardUpdated } from "../realtime";

const Payload = z.object({
    user_id: z.string().min(1),
    points: z.number().int().positive().max(100000),
    action_id: z.string().min(1),
    reason: z.string().optional()
});
export type ScorePayload = z.infer<typeof Payload>;

export async function applyScoreIncrease(input: unknown) {
    const p = Payload.parse(input);

    // DB transaction: event + upsert score
    await prisma.$transaction(async (tx) => {
        await tx.scoreEvent.create({
            data: { userId: p.user_id, actionId: p.action_id, points: p.points, reason: p.reason }
        });
        await tx.userScore.upsert({
            where: { userId: p.user_id },
            create: { userId: p.user_id, score: p.points },
            update: { score: { increment: p.points } }
        });
    });

    // Redis ZSET + realtime
    await incrementScore(p.user_id, p.points);
    const top = await getTop(10);
    emitLeaderboardUpdated({ type: "leaderboard.updated", top10: top });
}