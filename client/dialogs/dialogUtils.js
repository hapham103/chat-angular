angular.module('chat-app').service('DialogService', DialogUtils);

function DialogUtils(ModalService, chatService, authentication, $emit) {
    let myDialogs = new Object();
    myDialogs.newConversation = function () {
        function ModalController(close) {
            socket.emit('test');
            var self = this;
            self.currentUser = chatService.curUser;

            chatService.getUserList()
                .then(users=>{
                    self.users = users.data;
                    console.log('modal users', users.data);
                })

            self.numberOfReceiver = 0;
            self.receivers = [];
            self.conversationInfo = {
                name: self.conversationName,
                receivers: self.receivers
            };

            self.isChecked = function (user) {
                if(self.receivers.indexOf(user)===-1)
                    return false;
                else return true;
            }

            self.addReceiver = function (user) {
                if(!self.isChecked(user)){
                    self.receivers.push(user);
                    self.conversationMember = "";
                    self.numberOfReceiver ++;
                } else {
                    self.deleteReceiver(user);
                }
            };
            
            self.deleteReceiver = function (receiver) {
                self.numberOfReceiver --;
                var i = self.receivers.indexOf(receiver);
                if (i !== -1) {
                    self.receivers.splice(i, 1);
                }
            };

           

            self.onSubmit = function () {
                
                self.formError = "";
                if (!self.receivers) {
                    console.log('try again');
                    return false;
                } else {
                    let members = [];
                    members.push(self.currentUser.id)
                    let conversationName = self.currentUser.username;
                    for(r of self.receivers) {
                        members.push(r.id);
                        conversationName = conversationName + ", " + r.username;
                    }
                    let conversationInfo={};
                    if(self.receivers.length > 1){
                        conversationInfo = {
                            title: conversationName,
                            members: members,
                            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_xTTRxC3_MljWryPIq_7TvxHqzgn9aT7Lawf15wAaeteC0fF"
                        }
                    }else{
                        conversationInfo = {
                            title: "",
                            members: members,
                            avatar: ""
                        }
                    }
                    let create = true;
                    if(self.receivers.length==1){
                        chatService.listConver.forEach(function(con) {
                            console.log(con);
                            if(con.Users.length==1 && con.Users[0].id == self.receivers[0].id){
                                chatService.curConver = con;
                                chatService.listMess = con.Messages;
                                $emit('changeCurCon', chatService.curConver);
                                create = false;
                                self.cancel();
                            }
                                
                        })
                    }
                    if(create)
                        doSubmit(conversationInfo);
                    
                }
            };
            var doSubmit = function(info) {
                chatService.createConversation(info)
                    .then(function(con){
                        console.log('con', con);
                        
                        
                        if(self.receivers.length>1){
                            chatService.listConver.push(con.data);
                        }
                        else{
                            con.data.title = self.receivers[0].username;
                            con.data.avatar = self.receivers[0].avatar;
                            chatService.listConver.push(con.data);
                        }
                        con.data.Users = self.receivers;
                        con.data.Messages = [];
                        chatService.curConver = con.data;
                        chatService.listMess = con.data.Messages;
                        $emit('addConver', con.data);
                        
                        socket.emit('addConver', {conver: con.data, sender: self.currentUser});
                        
                    }).catch(err => {
                        console.log('createConversation err', err);
                    })
                self.cancel();
            }
            self.cancel = function () {
                close(null);
            }
        }

        ModalService.showModal({
            templateUrl: 'dialogs/new-conversation/new-conversation-modal.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
                if (data) console.log("imported", data);
            });
        });
    }
    myDialogs.addParticipant = function () {
        function ModalController(close) {
            console.log('modal add participant');
            var self = this;
            self.currentUser = chatService.curUser;
            chatService.getUserList()
                .then(users => {
                    self.users = users.data;
                    console.log('modal users', users.data);
                    self.users = self.users.filter(user => { user.id != self.currentUser.id });
                    // chatService.curConver.Users.forEach(function (u) {
                    //     console.log(u.id);
                    //     self.users = self.users.filter(user => {user.id != u.id });
                    // })
                    console.log('users of add par: ', self.users);
                })
            
        //     self.numberOfReceiver = 0;
        //     self.receivers = [];
        //     self.conversationInfo = {
        //         name: self.conversationName,
        //         receivers: self.receivers
        //     };

        //     self.isChecked = function (user) {
        //         if (self.receivers.indexOf(user) === -1)
        //             return false;
        //         else return true;
        //     }

        //     self.addReceiver = function (user) {
        //         if (!self.isChecked(user)) {
        //             self.receivers.push(user);
        //             self.conversationMember = "";
        //             self.numberOfReceiver++;
        //         } else {
        //             self.deleteReceiver(user);
        //         }
        //     };

        //     self.deleteReceiver = function (receiver) {
        //         self.numberOfReceiver--;
        //         var i = self.receivers.indexOf(receiver);
        //         if (i !== -1) {
        //             self.receivers.splice(i, 1);
        //         }
        //     };

        //     authentication.getCurrentUser()
        //         .then(user => {
        //             self.currentUser = user.data;
        //             console.log('user.data', user.data)
        //         }).catch(err => {
        //             console.log('err', err);
        //         })

        //     self.onSubmit = function () {
        //         self.formError = "";
        //         if (!self.receivers) {
        //             console.log('try again');
        //             return false;
        //         } else {
        //             let members = [];
        //             members.push(self.currentUser.id)
        //             let conversationName = self.currentUser.username;
        //             for (r of self.receivers) {
        //                 members.push(r.id);
        //                 conversationName = conversationName + ", " + r.username;
        //             }
        //             let conversationInfo = {
        //                 title: conversationName,
        //                 members: members,
        //                 avatar: "x"
        //             }
        //             doSubmit(conversationInfo);
        //         }
        //     };
        //     var doSubmit = function (info) {
        //         chatService.createConversation(info)
        //             .then(function (con) {
        //                 console.log('con', con);
        //             }).catch(err => {
        //                 console.log('createConversation err', err);
        //             })
        //         self.cancel();
        //     }
            self.cancel = function () {
                close(null);
            }
        }

        ModalService.showModal({
            templateUrl: 'dialogs/add-participant/add-participant-modal.html',
            controller: ModalController,
            controllerAs: 'Modal'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
                if (data) console.log("imported", data);
            });
        });
    }
    return myDialogs;
}