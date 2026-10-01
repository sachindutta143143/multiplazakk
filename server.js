const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const port = Number(process.env.PORT || 3000);

const mime = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.xml':'application/xml; charset=utf-8',
  '.txt':'text/plain; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.png':'image/png',
  '.webp':'image/webp',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon'
};

const compressible = new Set(['.html','.css','.js','.xml','.txt','.json','.svg']);
const gzipCache = new Map();

function safePath(p) {
  return path.normalize(path.join(root, p));
}

function cacheControl(ext, status) {
  if (status !== 200) return 'no-cache';
  if (ext === '.html' || ext === '.xml') return 'public, max-age=300, stale-while-revalidate=60';
  if (ext === '.css' || ext === '.js') return 'public, max-age=86400, stale-while-revalidate=3600';
  return 'public, max-age=31536000, immutable';
}

function sendFile(file, res, status = 200) {
  const ext = path.extname(file).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  const headers = {
    'Content-Type': type,
    'Cache-Control': cacheControl(ext, status),
    'X-Content-Type-Options': 'nosniff'
  };

  if (status !== 200 || !compressible.has(ext) || !/\bgzip\b/i.test(res.req.headers['accept-encoding'] || '')) {
    res.writeHead(status, headers);
    return fs.createReadStream(file).pipe(res);
  }

  let gz = gzipCache.get(file);
  if (gz) {
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    headers['Content-Length'] = gz.length;
    res.writeHead(status, headers);
    return res.end(gz);
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
      return res.end('Server error');
    }
    zlib.gzip(data, { level: 6 }, (gzErr, compressed) => {
      if (gzErr) {
        res.writeHead(status, headers);
        return res.end(data);
      }
      // Keep small compressed assets in memory for fast repeat requests.
      if (compressed.length < 512 * 1024) gzipCache.set(file, compressed);
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
      headers['Content-Length'] = compressed.length;
      res.writeHead(status, headers);
      res.end(compressed);
    });
  });
}

function notFound(res) {
  return sendFile(path.join(root, '404.html'), res, 404);
}

const server = http.createServer((req, res) => {
  let u;
  try {
    u = decodeURIComponent((req.url || '/').split('?')[0]);
  } catch {
    res.writeHead(400);
    return res.end('Bad request');
  }

  if (u === '/' || u === '') u = '/index.html';
  if (u.endsWith('/')) u += 'index.html';

  const file = safePath(u);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) return sendFile(file, res);

    // Clean SEO URLs: /printer-repair-aizawl -> printer-repair-aizawl.html
    if (!path.extname(u)) {
      const candidate = safePath(u + '.html');
      return fs.stat(candidate, (e, s) => {
        if (!e && s.isFile()) return sendFile(candidate, res);
        return notFound(res);
      });
    }
    return notFound(res);
  });
});

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.requestTimeout = 30000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Multi Plaza fast server running on port ${port}`);
});
