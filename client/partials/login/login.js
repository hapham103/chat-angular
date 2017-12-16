angular.module('chat-app').controller("loginCtrl", loginCtrl);

function loginCtrl( $location, $emit, $on, $timeout, authentication, chatService) {
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
                console.log("log in success");
                authentication.getCurrentUser()
                    .then(function(user){
                        chatService.curUser = user.data;
                        console.log(user);
                        chatService.listConver = chatService.curUser.Conversations;
                        chatService.curConver = chatService.listConver[0];
                        chatService.listMess = chatService.curConver.Messages;
                        socket.emit('listRoom', chatService.listConver);
                        
                        chatService.listConver.forEach(function(conver){
                            if(conver.Users.length == 1){
                                conver.title = conver.Users[0].username;
                                conver.avatar = conver.Users[0].avatar;
                            }
                        });

                        console.log('curUser: ', chatService.curUser);
                        console.log('listConver: ', chatService.listConver);
                        console.log('curConver: ', chatService.curConver);
                        console.log('listMess: ', chatService.listMess);

                        $location.path('/home');
                    })
            }).catch(function(err) {
                self.formError = "email or password is incorrect!";
                console.log('err', err);
            })
        }
}