var models = require('../models/db');
var User = models.User;
var Conversation = models.Conversation;

module.exports.getConversationList = function(req, res){
	Conversation.findAll({
		include: [{
			model: User,
			attributes: ['id', 'email'],
			where: {
				email: req.params.email
			}
		}]
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.send('err');
	})
}

module.exports.getConversation = function(req, res) {
    Conversation.findById(req.params.conversationid,{
	}).then(data=>{
    	res.send(data);
    }).catch(err=>{

    })
}
module.exports.createConversation = function (req,res) {
	Conversation.create({
		title: req.body.title,
		avatar: req.body.avatar
	}).then(data=>{
		let ids = req.body.members;
		data.setUsers(ids);
		res.send(data);
	}).catch(err=>{});
}
// module.exports.updateConversation = function(req,res) {
// 	Conversation.update({
// 		title: req.body.title
// 	},{
// 		where : {
// 			id : req.params.conversationid
// 		}
// 	}).then(data=>{
// 		res.send(data);
// 	})
// }
module.exports.addUserToConversation = function(req,res) {
	Conversation.findById(req.params.conversationid)
		.then(function(conversation) {
			let ids = req.body.id;
			conversation.addUsers(ids);
			res.send(conversation);
	})
}