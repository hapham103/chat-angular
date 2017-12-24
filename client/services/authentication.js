angular.module('chat-app').service('authentication', authentication);
function authentication ($window, $http) {

    var defaultAvatar = "avatar/default_user1.png";
    var saveToken = function(token) {
        $window.localStorage['chatapp-token'] = token;
    }
    var getToken = function () {
        return $window.localStorage['chatapp-token'];
    }
    var login = function(user) {
        return $http.post('/action/login', user)
                    .then(function (userdata){
                            saveToken(userdata.data);
                    })
    }
    var register = function(user) {
        user.avatar = defaultAvatar;
        return $http.post('/action/register', user)
                    .then(function(user){
                        saveToken(user.data);
                    })
    }
    var logout = function(){
        $window.localStorage.removeItem('chatapp-token');
    }
    var isLoggedIn = function() {
        var token = getToken();
        if(token){
            // console.log('token',token)
            // var payload = JSON.parse($window.atob(token.split('.')[1]));
            // return payload.exp > Date.now() / 1000;
            return true;
        } else {
            console.log('no token');
            return false;
        }
    }
    var getCurrentUser = function () {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return $http.get('/api/userlist/'+payload.email, {
                headers: {'Authorization': token}
            })
        } else {
            console.log('please loggin');
        }
    }


    return {
        login: login,
        logout: logout,
        register: register,
        getCurrentUser: getCurrentUser,
        getToken: getToken
    }
}
