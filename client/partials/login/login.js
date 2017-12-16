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
                        chatService.getConversationList()
                            .then(function (conversations) {
                                chatService.listConver = conversations.data;
                                chatService.curConver = chatService.listConver[0];
                                chatService.listMess = chatService.curConver.Messages;
                                chatService.listConver.forEach(function(conver){
                                    console.log(conver.id);
                                    socket.join('1');
                                });
                                console.log('curUser: ', chatService.curUser);
                                console.log('listConver: ', chatService.listConver);
                                console.log('curConver: ', chatService.curConver);
                                console.log('listMess: ', chatService.listMess);

                                $location.path('/home');
                            })
                    })
            }).catch(function(err) {
                self.formError = "email or password is incorrect!";
                console.log('err', err);
            })
        }
}