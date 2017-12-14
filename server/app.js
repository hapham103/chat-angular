var express = require('express');
var app = express();
var path = require('path');

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
app.use('/api', authVerify(), routesApi);

app.listen(3000, function () {
	console.log('listening on port 3000');
})