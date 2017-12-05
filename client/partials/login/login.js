angular.module('chat-app').controller("loginCtrl", loginCtrl);

function loginCtrl(db, $location, $emit, $on, $timeout) {
    let self = this;
    this.email;
    this.pwd;
    this.isLogin = false;
  
    this.login = function () {
        self.email = $('#email').val();
        self.pwd = $('#pwd').val();
        for (let i = 0; i < db.users.length; i++) {
            if (self.email == db.users[i].email && self.pwd == db.users[i].password) {
                db.curUser = db.users[i];
                socket.emit('curUserId', db.users[i].id);
                self.isLogin = true;
                break;
            }
        }
        if(!self.isLogin)
            alert('sai');
        else{
            self.isLogin = false;
            $timeout(function(){
                $location.path('/home');
            }, 500);
        }
    } ;
    console.log('log in: ', socket.id);
    socket.on('sendDB', function (data) {
        db.conversations = data.conversations;
        db.messages = data.messages;
        db.curConversation = data.conversations[0];
    });
}