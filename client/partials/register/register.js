angular.module('chat-app').controller("registerCtrl", registerCtrl);

function registerCtrl( $location, $emit, $on, $timeout, apiService) {
    let self = this;
    self.formError = ""
    self.user = {
        email: "",
        password: "",
        username: "",
        avatar: "",
        fullname: "",
        repassword:""
    }
    self.register = function () {
        console.log('register');
        if(!self.user.email ||!self.user.username|| !self.user.password || !self.user.repassword || !self.user.fullname || !self.user.avt) {
            self.formError = "All fields required, please try again!";
        }else if(self.user.password !== self.user.repassword){
            self.formError = "password not match!";
        } else {
            self.doRegister()
        }
    } ;

    self.doRegister = function () {
        console.log('doRegister');
        var newUser = {
            email: self.user.email,
            password: self.user.password,
            avatar: self.user.avatar,
            fullname: self.user.fullname,
            username: self.user.username
        }
        apiService.register(newUser)
            .then(function (user){
                console.log("success");
                $location.path('/home');
            }).catch(function(err) {
                self.formError = "Email existed!";
                console.log('err', err);
            })
    }
}