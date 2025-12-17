export function apiRouter(req: Request): Response {
    const url = new URL(req.url);

    if (url.pathname === "/api/health") {
        return Response.json({ status: "ok" });
    }

    return new Response("API Route Not Found", { status: 404 });
}
