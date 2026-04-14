import http from 'node:http';
import { ɵsetAngularAppEngineManifest as setAngularAppEngineManifest } from '@angular/ssr';
import '@angular/compiler';

import manifest from '../dist/magasin-jeux/server/angular-app-engine-manifest.mjs';

setAngularAppEngineManifest(manifest);

const { default: reqHandler } = await import('../dist/magasin-jeux/server/server.mjs');

const port = Number(process.env.PORT ?? 4000);

const server = http.createServer((req, res) => {
  reqHandler(req, res, () => {
    res.statusCode = 404;
    res.end('Not Found');
  });
});

server.listen(port, () => {
  console.log(`SSR server listening on http://localhost:${port}`);
});
