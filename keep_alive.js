var http = require('http');

http.createServer(function (req, res) {
  res.write("Client Online");
	res.end();
}).listen(8080);