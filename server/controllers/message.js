var models = require('../models/db');
var Message = models.Message;
var Conversation = models.Conversation;

module.exports.sendMessage = function (req, res) {
	Message.create({
		message: req.body.message,
		message_type: req.body.message_type,
		conversation_id: req.params.conversationid,
		sender_id : req.body.sender_id
		
	}).then(message => {
		res.send(message);
	}).catch(err => {});
}
module.exports.getMessage = function (req, res) {
	Message.findAll({
		where:{
			conversation_id: req.params.conversationid
		}
	}).then(data => {
		res.send(data);
	}).catch(err => {});
}