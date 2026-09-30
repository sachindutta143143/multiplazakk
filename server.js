const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png',
  '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.txt':'text/plain; charset=utf-8'
};

const server = http.createServer((req,res)=>{
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(filePath,(err,stat)=>{
    if (!err && stat.isDirectory()) return serve(path.join(filePath,'index.html'),res);
    if (!err && stat.isFile()) return serve(filePath,res);
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found');
  });
});
function serve(filePath,res){
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream', 'Cache-Control':'public, max-age=3600'});
  fs.createReadStream(filePath).pipe(res);
}
server.listen(port,'0.0.0.0',()=>console.log(`Multi Plaza running on port ${port}`));
