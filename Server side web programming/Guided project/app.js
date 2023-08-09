const http = request('http');

const hostname = '127.0.0.1'
const port = 8080;

const server = http.createServer((req,res) => {
    res.statuCode = 200;
    res.setHeader('Content Type','text/plain');
    res.end('Test Application');
});

server.listen(port,hostname,() =>{
    console.log('Server runs at http://${hostname}:${port}');
});