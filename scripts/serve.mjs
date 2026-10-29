import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||4321);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.mp4':'video/mp4','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=> {
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target=path.resolve(root,'.'+pathname);
    if(target!==root&&!target.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    let info;
    try {info=await stat(target);} catch {}
    if(info?.isDirectory()) target=path.join(target,'index.html');
    else if(!info&&!path.extname(target)) target=path.join(target,'index.html');
    let content;
    try {content=await readFile(target);} catch {res.statusCode=404;target=path.join(root,'404.html');content=await readFile(target);}
    res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store');
    if(req.headers.range && path.extname(target)==='.mp4') {
      const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(match) {
        const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),content.length-1):content.length-1;
        if(start>end||start>=content.length){res.writeHead(416,{'Content-Range':`bytes */${content.length}`});res.end();return;}
        res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${content.length}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});
        res.end(content.subarray(start,end+1));return;
      }
    }
    res.end(req.method==='HEAD'?undefined:content);
  } catch {res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));
