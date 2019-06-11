var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1 style="text-align: center;"><span style="color: #0000ff;"><strong>Hello from the container!!</strong></span></h1>');
}).listen(80);
