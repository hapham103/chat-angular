var db = require('./testdb');
var user = db.user;

module.exports.getUserList = function(req, res) {
	user.findAll().then(users=>{
		res.send(users);
	}).catch(err=>{});
}
module.exports.getUser = function(req, res) {
	user.findById(req.params.userid).then(user=> {
		res.send(user);
	}).catch(err=>{});
	// user.findAll({
	// 	where: {
	// 		id: 
	// 	}
	// }).then(user=>{
	// 	res.send(user);
	// })
}