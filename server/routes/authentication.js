var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');

// register and login
router.post('/register', function(req,res){
	ctrlAuth.register(req,res);
});
router.post('/login', function(req,res){
	ctrlAuth.login(req,res);
});

module.exports = router;