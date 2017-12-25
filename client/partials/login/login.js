angular.module('chat-app').controller("loginCtrl", loginCtrl);

function loginCtrl($location, $emit, $on, $timeout, authentication, chatService) {
    let self = this;
    self.formError = ""
    self.user = {
        email: "",
        password: ""
    }
    self.login = function () {
        console.log('login');
        if (!self.user.email || !self.user.password) {
            self.formError = "All fields required, please try again!";
        } else {
            self.doLoggin()
        }
    };

    self.doLoggin = function () {

        authentication.login(self.user)
            .then(function (user) {

                authentication.getCurrentUser()
                    .then(function (user) {
                        console.log(user);
                        chatService.curUser = user.data;
                        chatService.listMess = [];
                        chatService.listConver = [];
                        chatService.curConver = {};
                        if (chatService.curUser.Conversations.length > 0) {
                            chatService.listConver = chatService.curUser.Conversations;
                            chatService.curConver = chatService.listConver[0];
                            if (chatService.curConver.Messages.length > 0)
                                chatService.listMess = chatService.curConver.Messages;
                            socket.emit('listRoom', chatService.listConver);

                            chatService.listConver.forEach(function (conver) {
                                if (conver.Users.length == 2) {
                                    if (chatService.curUser.id != conver.Users[0].id) {
                                        conver.Users.splice(1, 1);
                                    } else {
                                        conver.Users.splice(0, 1);
                                    }
                                    conver.title = conver.Users[0].username;
                                    conver.avatar = conver.Users[0].avatar;
                                }
                            });
                        }else{
                            chatService.curConver = {
                                title: 'Chat App',
                                avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/30fe9b7917223.560be8f580f20.png',
                                
                            }
                        }
                        $location.path('/home');
                    })
            }).catch(function (err) {
                self.formError = "email or password is incorrect!";
                console.log('err', err);
            })
    }
}