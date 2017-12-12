var jwt = require('jsonwebtoken');
module.exports = function() {
    return function(req, res, next) {
        console.log('verify');
        var token = req.body.token || req.query.token || req.header['x-access-token'] || req.get('Authorization');
        console.log('token', token)
        if (token) {
            console.log('a token found');
            jwt.verify(token, 'secretKey', function (err, decoded) {
                if (err) {
                    return res.status(401).json({code: 401, success: false, message: 'Failed to authenticate'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).send({
                code: 401,
                success: false,
                message: 'No token provided.'
            })
        }
    }
}