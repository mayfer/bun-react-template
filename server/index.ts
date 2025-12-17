import { serve } from "bun";
import homepage from "client/index.html";
import { cac } from "cac";

import { apiRouter } from "./api";

const cli = cac("bun");
cli.usage("server/index.ts [options]");
cli.option("--prod", "Run in production mode (development=false).", {
  default: false,
});
cli.help();
cli.on("command:*", () => {
  console.error(`Unknown command: ${cli.args.join(" ")}`);
  cli.outputHelp();
  process.exit(1);
});

const parsed = cli.parse(Bun.argv);
if (parsed.options.help) {
  process.exit(0);
}
const allowedOptionKeys = new Set(["--", "prod", "help"]);
const unknownOptionKeys = Object.keys(parsed.options).filter(
  (key) => !allowedOptionKeys.has(key),
);
if (unknownOptionKeys.length > 0) {
  const key = unknownOptionKeys[0]!;
  const rendered = key.length === 1 ? `-${key}` : `--${key}`;
  console.error(`Unknown option: ${rendered}`);
  cli.outputHelp();
  process.exit(1);
}
if (parsed.args.length > 0) {
  console.error(`Unknown argument: ${parsed.args.join(" ")}`);
  cli.outputHelp();
  process.exit(1);
}
const development = !Boolean(parsed.options.prod);

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
  development,
});

console.log(`Listening on ${server.url}`);
