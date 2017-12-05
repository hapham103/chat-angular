var express = require('express');
var router = express.Router();
// var jwt = require ('express-jwt');
// var auth = jwt({
// 	secret: process.env.JWT_SECRET,
//     userProperty: 'payload'
// });

var ctrlChat = require('../controllers/chat');
var ctrlConversation = require('../controllers/conversation');
var ctrlAuth = require('../controllers/authentication');

//chat
// router.post('/chat/:conversationid/messages', ctrlChat.sendMessage);

//Conversation
// router.post('/conversations', ctrlConversation.createConversation);
// router.put('/conversations/:conversationid', ctrlConversation.updateConversation);
router.get('/conversations', ctrlConversation.getListConversation);

//register and login
// router.post('/register', ctrlAuth.register);
// router.post('/login', ctrlAuth.login);
module.exports = router;