import type { Server } from "http";
import { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export function initRealtime(server: Server) {
  io = new IOServer(server, { cors: { origin: "*" } });
  io.on("connection", () => {
    // noop
  });
}

export function emitLeaderboardUpdated(payload: unknown) {
  io?.emit("leaderboard.updated", payload);
}