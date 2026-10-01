const http=require('http');const fs=require('fs');const path=require('path');
const root=__dirname;const port=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
function safePath(p){return path.normalize(path.join(root,p));}
function serve(file,res,status=200){const ext=path.extname(file).toLowerCase();res.writeHead(status,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':status===200?'public, max-age=3600':'no-cache'});fs.createReadStream(file).pipe(res);}
const server=http.createServer((req,res)=>{let u=decodeURIComponent((req.url||'/').split('?')[0]);if(u==='/'||u==='')u='/index.html';if(u.endsWith('/'))u+='index.html';let file=safePath(u);if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden');}
fs.stat(file,(err,st)=>{if(!err&&st.isFile())return serve(file,res);if(!path.extname(u)){const candidate=safePath(u+'.html');return fs.stat(candidate,(e,s)=>e||!s.isFile()?serve(path.join(root,'404.html'),res,404):serve(candidate,res));}serve(path.join(root,'404.html'),res,404);});});
server.listen(port,'0.0.0.0',()=>console.log(`Multi Plaza running on port ${port}`));
