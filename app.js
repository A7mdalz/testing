var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'; 'size' : '20'});
    res.end('Hello from the container!!!!!!!!!!!');
}).listen(80);
