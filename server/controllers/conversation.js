var models = require('../models/db');
var User = models.User;
var Conversation = models.Conversation;
var Message = models.Message;

module.exports.getConversationList = function(req, res){
	User.findOne({
		include: {
			model: Conversation,
			include : {model: User}
		},
		where: {
			email: req.params.email
		}
	}).then(data => {
		res.send(data.Conversations);
	}).catch(err => {
		res.send('err');
	})
}

module.exports.getConversation = function(req, res) {
    Conversation.findById(req.params.conversationid,{
		include: [{
			model: User,
		}, {
			model: models.Message,
			include: {
				model: User,
			}
		}]
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
module.exports.updateConversation = function(req,res) {
	Conversation.findById(req.params.conversationid)
	.then(conversation=>{
		if(conversation) {
			conversation.update({
				title: req.body.title,
				avatar: req.body.avatar
			})
			.then(conversation => {
				res.send(conversation);
			})
		}
	})
}
module.exports.addUserToConversation = function(req,res) {
	Conversation.findById(req.params.conversationid)
		.then(function(conversation) {
			let ids = req.body.id;
			conversation.addUsers(ids);
			res.send(conversation);
	})
}