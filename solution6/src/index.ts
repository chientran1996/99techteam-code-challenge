import http from "node:http";
import { env } from "./config";
import app from "./app";
import { initRealtime } from "./realtime";

const server = http.createServer(app);
initRealtime(server);

server.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
});