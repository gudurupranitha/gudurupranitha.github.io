/*
  Minimal local server for the birthday site.
  - Serves static files from this folder
  - Provides a tiny JSON API to persist coupons in data/coupons.json

  Run:
    node server.cjs
  Then open:
    http://localhost:5500/
*/

const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data", "coupons.json");
const PORT = Number(process.env.PORT || 5500);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "cache-control": "no-store",
    ...headers,
  });
  res.end(body);
}

function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, value: null };
  }
}

let writeQueue = Promise.resolve();
async function withWriteLock(fn) {
  const prev = writeQueue;
  let release;
  writeQueue = new Promise((r) => (release = r));
  await prev;
  try {
    return await fn();
  } finally {
    release();
  }
}

async function readCoupons() {
  const raw = await fsp.readFile(DATA_FILE, "utf8");
  const parsed = safeJsonParse(raw);
  if (!parsed.ok || !Array.isArray(parsed.value)) return [];
  return parsed.value;
}

async function writeCoupons(coupons) {
  const tmp = DATA_FILE + ".tmp";
  const text = JSON.stringify(coupons, null, 2) + "\n";
  await fsp.writeFile(tmp, text, "utf8");
  await fsp.rename(tmp, DATA_FILE);
}

function newId() {
  return "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function isPathSafe(p) {
  const full = path.normalize(path.join(ROOT, p));
  return full.startsWith(ROOT);
}

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  if (!isPathSafe(pathname)) {
    send(res, 400, "Bad path");
    return;
  }

  const filePath = path.join(ROOT, pathname);

  try {
    const st = await fsp.stat(filePath);
    if (st.isDirectory()) {
      send(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    send(res, 404, "Not found");
  }
}

async function handleApi(req, res) {
  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  // /api/coupons
  if (parts.length === 2 && parts[0] === "api" && parts[1] === "coupons") {
    if (req.method === "GET") {
      const coupons = await readCoupons();
      send(res, 200, JSON.stringify(coupons), { "content-type": "application/json; charset=utf-8" });
      return;
    }

    if (req.method === "POST") {
      const raw = await readBody(req);
      const parsed = safeJsonParse(raw);
      const body = parsed.ok ? parsed.value : null;
      const title = String(body?.title || "").trim();
      const sub = String(body?.sub || "").trim();
      if (!title) {
        send(res, 400, JSON.stringify({ error: "title_required" }), { "content-type": "application/json; charset=utf-8" });
        return;
      }

      const created = await withWriteLock(async () => {
        const coupons = await readCoupons();
        const item = { id: newId(), title, sub: sub || "Good for one big smile!", redeemed: false };
        coupons.unshift(item);
        await writeCoupons(coupons);
        return item;
      });

      send(res, 201, JSON.stringify(created), { "content-type": "application/json; charset=utf-8" });
      return;
    }

    send(res, 405, "Method not allowed");
    return;
  }

  // /api/coupons/:id
  if (parts.length === 3 && parts[0] === "api" && parts[1] === "coupons") {
    const id = parts[2];

    if (req.method === "PATCH") {
      const raw = await readBody(req);
      const parsed = safeJsonParse(raw);
      const body = parsed.ok ? parsed.value : null;
      const redeemed = body?.redeemed;
      if (typeof redeemed !== "boolean") {
        send(res, 400, JSON.stringify({ error: "redeemed_boolean_required" }), {
          "content-type": "application/json; charset=utf-8",
        });
        return;
      }

      const updated = await withWriteLock(async () => {
        const coupons = await readCoupons();
        const idx = coupons.findIndex((c) => c && c.id === id);
        if (idx < 0) return null;
        coupons[idx] = { ...coupons[idx], redeemed };
        await writeCoupons(coupons);
        return coupons[idx];
      });

      if (!updated) {
        send(res, 404, JSON.stringify({ error: "not_found" }), { "content-type": "application/json; charset=utf-8" });
        return;
      }

      send(res, 200, JSON.stringify(updated), { "content-type": "application/json; charset=utf-8" });
      return;
    }

    if (req.method === "DELETE") {
      const ok = await withWriteLock(async () => {
        const coupons = await readCoupons();
        const next = coupons.filter((c) => c && c.id !== id);
        if (next.length === coupons.length) return false;
        await writeCoupons(next);
        return true;
      });

      if (!ok) {
        send(res, 404, JSON.stringify({ error: "not_found" }), { "content-type": "application/json; charset=utf-8" });
        return;
      }

      send(res, 200, JSON.stringify({ ok: true }), { "content-type": "application/json; charset=utf-8" });
      return;
    }

    send(res, 405, "Method not allowed");
    return;
  }

  send(res, 404, JSON.stringify({ error: "unknown_endpoint" }), { "content-type": "application/json; charset=utf-8" });
}

const server = http.createServer(async (req, res) => {
  try {
    if ((req.url || "").startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    await serveStatic(req, res);
  } catch (e) {
    send(res, 500, "Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Birthday site server running: http://localhost:${PORT}/`);
});
