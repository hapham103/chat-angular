var md5 = require('md5');
var jwt = require('jsonwebtoken');
var jsonResponse = require('../response');
var errorCode = require('../errorCode').CODES;
var models = require('../models/db');
var User = models.User;

module.exports.register = function(req, res) {
    req.body.password = md5(req.body.password);
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email.body,
        avatar: req.body.avatar,
        fullname: req.body.fullname,
        is_active: req.body.is_active
    }).then(function(result){
        var token = jwt.sign(req.body,'secretKey');
        res.send(jsonResponse(errorCode.SUCCESS,'SUCCESS', token));
    }).catch(function(){
        res.send(jsonResponse(errorCode.ERROR_USER_EXISTED,'USER EXISTED'));
    })
}

module.exports.login = function(req, res) {
    req.body.password = md5(req.body.password);
    User.findOne({where: {email: req.body.email}})
        .then(function(user){
            if(!user) {
                res.send(jsonResponse(errorCode.ERROR_USER_NOT_EXISTS,'USER NOT EXIST'));
            } else {
                if(user.password !== req.body.password){
                    res.send(jsonResponse(errorCode.ERROR_WRONG_PASSWORD, "WRONG PASSWORD"));
                } else {
                    var responseUser = {
                        "username": req.body.username,
                        "password": req.body.password,
                        "email": user.email,
                        "avatar": user.avatar,
                        "fullname": user.fullname,
                        "is_active": user.is_active
                    };
                    var token = jwt.sign(responseUser, 'secretKey');
                    res.send(jsonResponse(errorCode.SUCCESS, "SUCCESS", token));
                }
            }
        })
}