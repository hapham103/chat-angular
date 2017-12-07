var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./controllers/testdb');
var routesApi = require('./routes/index');
app.use('/api', routesApi);

app.listen(3000, function () {
	console.log('listening on port 3000');
})