var express = require('express');
var app = express();
var server = require('http').Server(app);

var path = require('path');

var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./models/db');
var routesApi = require('./routes/index');
var authRoutesApi = require('./routes/authentication');
var uploadRoutesApi = require('./routes/upload');
var authVerify = require('./controllers/verify-authentication');

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../uploads')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.use('/action', authRoutesApi);
// app.use(authVerify());
// app.use('/api', authVerify(), routesApi);
app.use('/upload', uploadRoutesApi);
app.use('/api', routesApi);

server.listen(3000, function () {
	console.log('listening on port 3000');
});

io.on('connection', function (socket) {
	console.log('Connection!');
	socket.on('listRoom', function (data) {
		data.forEach(function(room) {
			socket.join(room.id);
		});
	});
	socket.on('test', function (params) {
		console.log('test');
	})
	socket.on('sendMessage', function(data){
		
		console.log(data.content);
		io.in(data.room.id).emit('receiveMessage', data);
	});
	socket.on('joinRoomAdded', function (data) {
		socket.join(data.id);
	})
	socket.on('addConver', function (data) {
		console.log(data.id);
		socket.join(data.conver.id);
		if(data.conver.Users.length==1){
			data.conver.title = data.sender.username;
			data.conver.avatar = data.sender.avatar;
		}
		

		socket.broadcast.emit('addListConver', data.conver);

		// socket.join(data.id);
	})
});