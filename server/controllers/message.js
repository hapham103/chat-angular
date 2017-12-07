var db = require('./testdb');
var message = db.message;

module.exports.sendMessage = function (req, res) {
	message.create(req.body).then(data => {
		res.send(data);
	}).catch(err => {});
}
module.exports.getMessage = function (req, res) {
	message.findAll().then(data => {
		res.send(data);
	}).catch(err => {});
}