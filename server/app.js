var express = require('express');
var app = express();
var path = require('path');

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
app.use('/api', authVerify(), routesApi);
app.use('/upload',  uploadRoutesApi);

app.listen(3000, function () {
	console.log('listening on port 3000');
})