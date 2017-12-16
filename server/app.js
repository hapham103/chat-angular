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
var authVerify = require('./controllers/verify-authentication');

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.use('/action', authRoutesApi);
// app.use(authVerify());
app.use('/api', routesApi);



server.listen(3000, function () {
	console.log('listening on port 3000');
});

io.on('connection', function (socket) {
	console.log('Connection!');
	socket.on('sendMessage', function(data){
		io.in(data.room_id).emit('reciveMessage', data);
	})
	
});