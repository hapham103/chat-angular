var models = require('../models/db');
var Op = models.Op;
var User = models.User;

module.exports.getUserList = function(req, res) {
	User.findAll().then(users=>{
		res.send(users);
	}).catch(err=>{});
}
module.exports.getUserById = function(req, res) {
	User.findById(req.params.userid, {
		// include: {
		// 	model: models.Conversation,
		// 	include: models.Message
		// }
	}).then(user=> {
		res.send(user);
	}).catch(err=>{});
}
module.exports.getUserByEmail = function (req, res) {
	User.findOne({
		where: {
			email: req.params.email
		},
		include: {
			model: models.Conversation,
			include: [
				{ 
					model: models.Message,
					include: [{
						model: User
					}] 
				}, 
				{ 
					model: User, 
					// where: { 
					// 	email: { 
					// 		[Op.notLike]: req.params.email
					// 	}
					// }
				}]
		}
	}).then(user => {
		res.send(user);
	}).catch(err=>{});
}