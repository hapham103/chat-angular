var express = require('express');
var app = express();

var routesApi = require('./routes/index');
app.use('/api', routesApi);

app.listen(3000, function () {
	console.log('listening on port 3000');
})