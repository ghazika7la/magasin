import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';

const outputDir = path.resolve('docs/browser');
const routes = ['/', '/gta-detail', '/fifa'];
const host = '127.0.0.1';
const port = 4173;

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
    case '.mjs':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

function resolvePathname(requestUrl) {
  const parsedUrl = new URL(requestUrl, `http://${host}:${port}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  return pathname;
}

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const pathname = resolvePathname(req.url || '/');
      const candidatePath = path.join(rootDir, pathname);
      const safePath = path.normalize(candidatePath);

      if (!safePath.startsWith(path.normalize(rootDir))) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      let finalPath = safePath;
      if (!fs.existsSync(finalPath) || fs.statSync(finalPath).isDirectory()) {
        finalPath = path.join(rootDir, 'index.html');
      }

      if (!fs.existsSync(finalPath)) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      res.setHeader('Content-Type', contentTypeFor(finalPath));
      fs.createReadStream(finalPath).pipe(res);
    });

    server.listen(port, host, () => resolve(server));
    server.on('error', reject);
  });
}

function destinationForRoute(route) {
  if (route === '/') {
    return path.join(outputDir, 'index.html');
  }

  const cleanRoute = route.replace(/^\//, '');
  return path.join(outputDir, cleanRoute, 'index.html');
}

async function writeRouteSnapshot(page, route) {
  const targetUrl = `http://${host}:${port}${route}`;
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  const html = await page.evaluate(() => {
    return `<!doctype html>\n${document.documentElement.outerHTML}`;
  });

  const destination = destinationForRoute(route);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html, 'utf8');
  console.log(`Prerendered route snapshot: ${route} -> ${destination}`);
}

async function run() {
  if (!fs.existsSync(outputDir)) {
    throw new Error(`Build output not found: ${outputDir}`);
  }

  const allowedSnapshotFolders = new Set(
    routes
      .filter((route) => route !== '/')
      .map((route) => route.replace(/^\//, ''))
  );

  for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !allowedSnapshotFolders.has(entry.name)) {
      fs.rmSync(path.join(outputDir, entry.name), { recursive: true, force: true });
    }
  }

  const server = await startStaticServer(outputDir);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      for (const route of routes) {
        await writeRouteSnapshot(page, route);
      }
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
