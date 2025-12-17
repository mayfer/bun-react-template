import { serve } from "bun";
import homepage from "client/index.html";

import { apiRouter } from "./api";

const server = serve({
  routes: {
    "/": homepage,
    "/api": apiRouter,
    "/ws": (req) => {
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
  },
  websocket: {
    open(ws) {
      console.log("Client connected to socket");
    },
    message(ws, message) {
      console.log("Client sent message");
      ws.send(JSON.stringify({
        message: "Hello from server",
      }));
    },
    close(ws, code, message) {
      console.log("Client disconnected from socket");
    },
    drain(ws) {
      console.log("Socket is ready to receive more data");
    },
  },
  development: true,
});

console.log(`Listening on ${server.url}`);