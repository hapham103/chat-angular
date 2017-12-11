angular.module('chat-app').service('authentication', authentication);
function authentication ($window, $http) {
    var saveToken = function(token) {
        $window.localStorage['chatapp-token'] = token;
    }
    var getToken = function () {
        return $window.localStorage['chatapp-token'];
    }
    var login = function(user) {
        console.log('login call');
        return $http.post('/api/login', user)
                    .then(function (userdata){
                            saveToken(userdata.data);
                    })
    }
    var register = function(user) {
        console.log('register call');
        return $http.post('/api/register', user)
                    .then(function(user){
                        saveToken(user.data);
                    })
    }
    var logout = function(){
        $window.localStorange.removeItem('chatapp-token');
    }
    var isLoggedIn = function() {
        var token = getToken();
        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }
    var currentUser = function () {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                email : payload.email,
                name : payload.name
            };
        }
    }
    return {
        saveToken: saveToken,
        getToken: getToken,
        login: login,
        register: register,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser
    }
}