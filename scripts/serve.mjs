import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, relative, isAbsolute, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const directory = args.shift() || "src";
if (!["src", "dist"].includes(directory)) throw new Error("Serve directory must be src or dist.");

function option(name, fallback) {
  const i = args.indexOf(name);
  const inline = args.find(value => value.startsWith(`${name}=`));
  return inline ? inline.slice(name.length + 1) : i >= 0 ? args[i + 1] || fallback : fallback;
}

const positionalPort = args.find(a => /^\d+$/.test(a));
const positionalHost = args.find(a => a === "0.0.0.0" || a === "localhost" || a === "127.0.0.1");

// Prefer container-specific internal app port (e.g. 3000) when PORT points to reverse-proxy port 8080
const envPort = (process.env.PORT === "8080" && process.env.DEFAULT_APP_PORT)
  ? process.env.DEFAULT_APP_PORT
  : (process.env.DEFAULT_APP_PORT || process.env.PORT);

const host = option("--host", positionalHost || process.env.HOST || "0.0.0.0");
const port = Number(option("--port", positionalPort || envPort || "3000"));
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid port.");

const root = fileURLToPath(new URL(`../${directory}/`, import.meta.url));
try {
  await stat(resolve(root, "index.html"));
} catch {
  throw new Error("Missing output. Run npm run build before npm run preview.");
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8"
};

const server = createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let target = resolve(root, `.${pathname}`);

    // If path is a directory or points to one, serve index.html inside it
    try {
      const s = await stat(target);
      if (s.isDirectory()) {
        target = resolve(target, "index.html");
      }
    } catch {
      // Check if target/index.html or target.html exists
      try {
        const dirIndex = resolve(target, "index.html");
        await stat(dirIndex);
        target = dirIndex;
      } catch {
        try {
          const htmlFile = target + ".html";
          await stat(htmlFile);
          target = htmlFile;
        } catch {}
      }
    }

    const rel = relative(root, target);
    if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const data = await readFile(target);
    res.writeHead(200, {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff"
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch (error) {
    res.writeHead(error.code === "ENOENT" || error.code === "EISDIR" ? 404 : 400);
    res.end("Resource unavailable");
  }
});

server.on("error", error => {
  console.error(error.message);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Synaptic AI: http://${host}:${port}\nServing ${directory}/.`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close());
}
