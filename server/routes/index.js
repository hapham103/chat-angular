var express = require('express');
var router = express.Router();

var ctrlMessage = require('../controllers/message');
var ctrlConversation = require('../controllers/conversation');
var ctrlUser = require('../controllers/user');

//user
router.get('/users', function(req,res) {
	ctrlUser.getUserList(req,res);
})
router.get('/users/:userid', function(req, res) {
	ctrlUser.getUserById(req,res);
})
router.get('/userlist/:email', function(req, res) {
	ctrlUser.getUserByEmail(req,res);
})

//chat
router.get('/conversations/:conversationid/messages', function (req,res) {
	ctrlMessage.getMessage(req,res);
})
router.post('/conversations/:conversationid/messages/new', function(req,res) {
	ctrlMessage.sendMessage(req,res);
});

//Conversation
router.post('/conversations/new', function(req,res) {
	ctrlConversation.createConversation(req,res);
});
// router.put('/conversations/:conversationid', function(req,res) {
// 	ctrlConversation.updateConversation(req,res);
// });
router.get('/conversations/:conversationid', function(req, res){
	ctrlConversation.getConversation(req, res);
});
router.get('/conversationlist/:email', function(req,res){
	ctrlConversation.getConversationList(req,res);
})
router.put('/conversations/:conversationid/add', function(req,res) {
	ctrlConversation.addUserToConversation(req,res);
})

module.exports = router;