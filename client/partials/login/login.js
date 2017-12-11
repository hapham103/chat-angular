angular.module('chat-app').controller("loginCtrl", loginCtrl);

function loginCtrl( $location, $emit, $on, $timeout, authentication) {
    let self = this;
    self.formError = ""
    self.user = {
        email: "",
        password: ""
    }
    self.login = function () {
        console.log('login');
        if(!self.user.email || !self.user.password) {
            self.formError = "All fields required, please try again!";
        } else {
            self.doLoggin()
        }
    } ;

    self.doLoggin = function () {
        console.log('dologin');
        authentication.login(self.user)
            .then(function (user){
                console.log("success");
                $location.path('/home');
            }).catch(function(err) {
                self.formError = "username or password is incorrect!";
                console.log('err', err);
            })
        }
}