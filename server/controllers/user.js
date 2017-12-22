var models = require('../models/db');
var md5 = require('md5');
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
module.exports.editUser = function (req, res) {
	User.findById(req.params.userid)
		.then(user=>{
			if(user) {
				if(req.body.password){
					req.body.password = md5(req.body.password);
					user.update({
						username: req.body.username,
						password: req.body.password,
						email: req.body.email,
						fullname: req.body.fullname,
						avatar: req.body.avatar
					})
					.then(user => {
						res.send(user);
					})
				} else {
					user.update({
						username: req.body.username,
						email: req.body.email,
						fullname: req.body.fullname,
						avatar: req.body.avatar
					})
					.then(user => {
						res.send(user);
					})
				}
			}
		})
}