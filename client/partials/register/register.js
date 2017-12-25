angular.module('chat-app').controller("registerCtrl", registerCtrl);

function registerCtrl( $location, $emit, $on, $timeout, authentication, uploadService, chatService) {
    let self = this;
    self.formError = ""
    self.user = {
        email: "",
        password: "",
        username: "",
        avatar: 'avatar/default_user.png',
        fullname: "",
        repassword:""
    }

    self.register = function (file) {
        console.log(file);

        if(!self.user.email ||!self.user.username|| !self.user.password || !self.user.repassword || !self.user.fullname) {
            self.formError = "All fields required, please try again!";
        }else if(self.user.password !== self.user.repassword){
            self.formError = "password not match!";
        } else {
            self.doRegister(file)
        }
    } ;

    self.doRegister = function (file) {

        var formData = new FormData();
        formData.append('file', file);

        uploadService.uploadFile(formData)
            .then((rs)=>{
                console.log('uploadFile ok', rs);
                self.user.avatar = rs.data.content;
            }).catch((err)=> {
                console.log("upload file fail", err);
            })

        var newUser = {
            email: self.user.email,
            password: self.user.password,
            avatar: 'avatar/default_user.png',
            fullname: self.user.fullname,
            username: self.user.username
        }

        authentication.register(newUser)
            .then(function (user){
                chatService.curUser = newUser;
                chatService.listMess = [];
                chatService.listConver = [];
                chatService.curConver = {};
                $location.path('/');
            }).catch(function(err) {
                self.formError = "Email existed!";
                console.log('err', err);
            })
    }
}
