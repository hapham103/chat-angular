var models = require('../models/db');
var Message = models.Message;

module.exports.sendMessage = function (req, res) {
	Message.create(req.body).then(message => {
		res.send(message);
	}).catch(err => {});
}
// module.exports.getMessage = function (req, res) {
// 	Message.findAll().then(data => {
// 		res.send(data);
// 	}).catch(err => {});
// }