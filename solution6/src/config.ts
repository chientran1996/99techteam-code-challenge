import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  DATABASE_URL: process.env.DATABASE_URL!,
  ACTION_WEBHOOK_SECRET: process.env.ACTION_WEBHOOK_SECRET || "dev_secret"
};