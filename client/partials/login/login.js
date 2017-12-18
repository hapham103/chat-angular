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
        
        authentication.login(self.user)
            .then(function (user){
                
                authentication.getCurrentUser()
                    .then(function(user){
                        chatService.curUser = user.data;
                        
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

                       

                        $location.path('/home');
                    })
            }).catch(function(err) {
                self.formError = "email or password is incorrect!";
                console.log('err', err);
            })
        }
}