import { redis } from "../redis";

const ZSET_KEY = "leaderboard:zset";

export async function incrementScore(userId: string, points: number) {
    await redis.zincrby(ZSET_KEY, points, userId);
    await redis.del("lb:top:10"); // invalidate small cache
}

export async function getTop(limit = 10) {
    const cacheKey = `lb:top:${limit}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const arr = await redis.zrevrange(ZSET_KEY, 0, limit - 1, "WITHSCORES");
    const items: { user_id: string; score: number }[] = [];
    for (let i = 0; i < arr.length; i += 2) {
        items.push({ user_id: arr[i], score: Number(arr[i + 1]) });
    }
    await redis.setex(cacheKey, 3, JSON.stringify(items)); // 3s cache
    return items;
}