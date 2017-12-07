var models = require('../models/db');
var User = models.User;

module.exports.getUserList = function(req, res) {
	User.findAll().then(users=>{
		res.send(users);
	}).catch(err=>{});
}
module.exports.getUser = function(req, res) {
	User.findById(req.params.userid, {
		include: {
			model: models.Conversation,
			include: models.Message
		}
	}).then(user=> {
		res.send(user);
	}).catch(err=>{});
}