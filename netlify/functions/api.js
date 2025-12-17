const path = require("path");

const jsonServer = require("json-server");
const serverless = require("serverless-http");

function createApp() {
  const app = jsonServer.create();

  // Netlify Functions run with project root as cwd, so db.json can be referenced from there.
  const dbFile = path.join(process.cwd(), "db.json");
  const router = jsonServer.router(dbFile);

  app.use(jsonServer.defaults());
  app.use(jsonServer.bodyParser);

  // Netlify routes to functions as `/.netlify/functions/<name>/*`.
  // Also, our public API is exposed under `/api/*`.
  // Normalize URL so json-server sees `/cursos` instead of `/api/cursos` (or `/.netlify/functions/api/cursos`).
  app.use((req, _res, next) => {
    if (typeof req.url === "string") {
      req.url = req.url
        .replace(/^\/\.netlify\/functions\/api/, "")
        .replace(/^\/api/, "");
      if (req.url === "") req.url = "/";
    }
    next();
  });

  // Optional: add a simple health endpoint
  app.get("/", (_req, res) => {
    res.json({ ok: true, message: "json-server is running on Netlify Functions" });
  });

  app.use(router);

  return app;
}

const handler = serverless(createApp(), {
  // Improve base64 handling; keep defaults otherwise.
  binary: ["*/*"],
});

module.exports = { handler };


