import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const rootDir = path.resolve('docs/browser');
const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4000);

function contentTypeFor(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
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

function resolveFilePath(requestUrl) {
  const parsedUrl = new URL(requestUrl, `http://${host}:${port}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  return path.join(rootDir, pathname);
}

const server = http.createServer((req, res) => {
  const requestedPath = resolveFilePath(req.url || '/');
  const normalizedPath = path.normalize(requestedPath);
  const normalizedRoot = path.normalize(rootDir);

  if (!normalizedPath.startsWith(normalizedRoot)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  let finalPath = normalizedPath;

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

server.listen(port, host, () => {
  console.log(`Static prerender server listening on http://${host}:${port}`);
});