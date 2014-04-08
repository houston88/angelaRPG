// Simple static serve to run in node
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

//app.listen(3000);
server.listen(3000);

// Serve static files
app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

console.log("Server running at http://localhost:3000/");