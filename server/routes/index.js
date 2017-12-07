var express = require('express');
var router = express.Router();
// var jwt = require ('express-jwt');
// var auth = jwt({
// 	secret: process.env.JWT_SECRET,
//     userProperty: 'payload'
// });

var ctrlMessage = require('../controllers/message');
var ctrlConversation = require('../controllers/conversation');
var ctrlAuth = require('../controllers/authentication');
var ctrlUser = require('../controllers/user');

//user
router.get('/users', function(req,res) {
	ctrlUser.getUserList(req,res);
})
router.get('/users/:userid', function(req, res) {
	ctrlUser.getUser(req,res);
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
router.put('/conversations/:conversationid', function(req,res) {
	ctrlConversation.updateConversation(req,res);
});
router.get('/conversations', function(req, res){
	ctrlConversation.getListConversation(req, res);
});

//register and login
// router.post('/register', ctrlAuth.register);
// router.post('/login', ctrlAuth.login);
module.exports = router;