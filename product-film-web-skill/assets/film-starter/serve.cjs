const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.wav':'audio/wav','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
const server = http.createServer((req, res) => {
 let filename;
 try {filename = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));}
 catch {res.writeHead(400);res.end('Bad request');return;}
 if (!filename.startsWith(root + path.sep) && filename !== root) {res.writeHead(403);res.end();return;}
 if (filename === root || filename.endsWith(path.sep)) filename = path.join(filename, 'index.html');
 fs.readFile(filename, (err, data) => {
  if (err) {res.writeHead(404);res.end('Not found');return;}
  const headers={'Content-Type':types[path.extname(filename)] || 'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
  const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range||'');
  if(range && data.length) {
   const start=range[1]?Number(range[1]):Math.max(0,data.length-Number(range[2]));
   const end=range[1]&&range[2]?Math.min(Number(range[2]),data.length-1):data.length-1;
   if(start>end||start>=data.length) {res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}
   res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(data.subarray(start,end+1));return;
  }
  res.writeHead(200,{...headers,'Content-Length':data.length});res.end(data);
 });
});
const port = Number(process.argv[2] || 4178);
server.listen(port, '127.0.0.1', () => console.log('product film: http://localhost:' + port));
server.on('error', err => {console.error(err.message);process.exitCode = 1;});

