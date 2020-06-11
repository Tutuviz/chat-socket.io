const express = require('express');
const server = express();
const http = require('http');
const app = http.createServer(server);
const io = require('socket.io')(app);

server.use('/', (req, res) => {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log(`User ${socket.id} connected.`);

	socket.on('chat message', (content) => {
		console.log('message:', content.message);
		io.emit('chat message', content.message);
	});

	socket.on('disconnect', (e) => {
		console.log(`User ${socket.id} disconnected.`);
	});
});

app.listen(8081, () => {
	console.log(`Server rodadndo na porta ${8081}`);
});
