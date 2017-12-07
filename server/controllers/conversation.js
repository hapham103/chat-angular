var db = require('./testdb');
var conversation = db.conversation;
module.exports.getListConversation = function(req, res) {
    console.log('ok');
    conversation.findAll().then(function(data) {
    	res.send(data);
    }).catch(err=>{

    })
}
module.exports.createConversation = function (req,res) {
	conversation.create(req.body).then(data=>{
		res.send(data);
	}).catch(err=>{});
}
module.exports.updateConversation = function(req,res) {
	conversation.update({
		name: req.body.name
	},{
		where : {
			id : req.params.conversationid
		}
	}).then(rs=>{
		res.send(rs);
	})
}