var db = require('./testdb');
var user = db.user;
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var jsonResponse = require('../response');
var errorCode = require('../errorCode').CODES;

module.exports.register = function(req, res) {
    req.body.password = md5(req.body.password);
    user.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(function(result){
        var token = jwt.sign(req.body,'secretKey');
        res.send(jsonResponse(errorCode.SUCCESS,'SUCCESS', token));
    }).catch(function(){
        res.send(jsonResponse(errorCode.ERROR_USER_EXISTED,'USER EXISTED'));
    })
}

module.exports.login = function(req, res) {
    req.body.password = md5(req.body.password);
    user.findOne({where: {name: req.body.name}})
        .then(function(user){
            if(!user) {
                res.send(jsonResponse(errorCode.ERROR_USER_NOT_EXISTS,'USER NOT EXIST'));
            } else {
                if(user.password !== req.body.password){
                    res.send(jsonResponse(errorCode.ERROR_WRONG_PASSWORD, "WRONG PASSWORD"));
                } else {
                    var responseUser = {
                        "name": req.body.name,
                        "password": req.body.password,
                        "email": user.email
                    };
                    var token = jwt.sign(responseUser, 'secretKey');
                    res.send(jsonResponse(errorCode.SUCCESS, "SUCCESS", token));
                }
            }
        })
}