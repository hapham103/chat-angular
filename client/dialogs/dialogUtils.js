angular.module('chat-app').service('DialogService', DialogUtils);

function DialogUtils(ModalService, chatService, $timeout, authentication, $emit, uploadService) {
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
                        socket.emit('addConver', {conver: con.data, sender: self.currentUser, receivers: self.receivers});
                        
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
                    chatService.curConver.Users.forEach(function (u) {
                        self.users = self.users.filter(function (user) {
                            return user.id != self.currentUser.id && user.id  != u.id;
                        });
                    })
                })
            
            self.numberOfReceiver = 0;
            self.receivers = [];
            self.isChecked = function (user) {
                if (self.receivers.indexOf(user) === -1)
                    return false;
                else return true;
            }

            self.addReceiver = function (user) {
                if (!self.isChecked(user)) {
                    self.receivers.push(user);
                    self.conversationMember = "";
                    self.numberOfReceiver++;
                } else {
                    self.deleteReceiver(user);
                }
            };

            self.deleteReceiver = function (receiver) {
                self.numberOfReceiver--;
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
                   
                    for (r of self.receivers) {
                        members.push(r.id);
                    }
                    var user = {
                        id: members
                    }
                    doSubmit(chatService.curConver.id, user);
                }
            };
            var doSubmit = function (conversationid, user) {
                chatService.addUserToConversation(conversationid, user)
                    .then(function (con) {
                        console.log('add user success');
                        let newTitle = chatService.curConver.title;
                        self.receivers.forEach(function(rec){
                            newTitle += (' ,' + rec.username );
                        })
                        if(chatService.curConver.title.indexOf(", ") != -1){
                            chatService.updateConversation(conversationid, { title: newTitle })
                                .then(function (c) {
                                    console.log('update title success: ', c);
                                    socket.emit('addUser', { conver: c.data, users: self.receivers });
                                    self.cancel();
                                })
                                .catch(err => { console.log('update title fail', err); });
                        }else{
                            console.log('update title success: ', con);
                            socket.emit('addUser', { conver: con.data, users: self.receivers });
                            self.cancel();
                        }
                    }).catch(err => {
                        console.log('add user err', err);
                    })
                
            }
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
    myDialogs.editUser = function () {

        function ModalController (close) {
            let self = this;
            this.curUser = chatService.curUser;
            self.newUser = {};
            self.newUser.username = this.curUser.username;
            self.newUser.fullname = this.curUser.fullname;
            self.newUser.email = this.curUser.email;
            self.newUser.avatar = this.curUser.avatar;
            self.newPassword ="";
            self.newConfirm = "";

            this.cancel = function () {
                close(null);
            }

            this.onSubmit = function () {
               if (self.newPassword !== self.newConfirm) {
                    alert("Password is not match");
                } else {
                    if(self.newPassword){
                        self.newUser.password = self.newPassword;
                    }
                    if(this.avatar) {
                        var formData = new FormData();
                        formData.append('file', self.avatar);
                        uploadService.uploadAvatar(formData)
                            .then((rs)=>{
                                self.newUser.avatar = rs.data.content;
                                
                                console.log('new user', self.newUser);
                                chatService.editUser(this.curUser.id, self.newUser)
                                .then(user => {
                                    chatService.curUser.avatar = self.newUser.avatar;
                                    self.newUser.username = user.data.username;
                                    chatService.curUser.username = self.newUser.username;
                                    
                                    close(null);
                                }).catch(err=>{
                                    console.log('edit user fail',err);
                                })
                            }).catch((err)=> {
                                console.log("upload avatar fail", err);
                            })
                        } else {
                            console.log('newUser', self.newUser);
                            chatService.editUser(this.curUser.id, self.newUser)
                            .then(user => {
                                self.newUser.username = user.data.username;
            
                                chatService.curUser.username = user.data.username;
                                //lap socket io vao day
                                close(null);
                            }).catch(err=>{
                                console.log('edit user fail',err);
                            })
                    }
                }
            }
        }

        ModalService.showModal({
            templateUrl: 'dialogs/edit-user/edit-user-modal.html',
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
    myDialogs.editConversation = function () {
        function ModalController(close, chatService) {

            let self = this;
            self.curConver = chatService.curConver;
            self.newConver = {
                title: self.curConver.title
            }
            this.cancel = function () {
                close(null);
            }
            this.onSubmit = function () {
                if (self.avatar) {
                    var formData = new FormData();
                    formData.append('file', self.avatar);
                    uploadService.uploadAvatar(formData)
                        .then((rs) => {
                            self.newConver.avatar = rs.data.content;
                            console.log('new user', self.newUser);
                            chatService.updateConversation(this.curConver.id, self.newConver)
                                .then(conver => {
                                    chatService.curConver.title = self.newConver.title;
                                    chatService.curConver.avatar = self.newConver.avatar;
                                    console.log('edit success');
                                    close(null);
                                }).catch(err => {
                                    console.log('edit conversation fail', err);
                                })
                            }).catch((err) => {
                                console.log("upload avatar fail", err);
                            })
                        } else {
                            chatService.updateConversation(this.curConver.id, self.newConver)
                            .then(conver => {
                                chatService.curConver.title = self.newConver.title;
                            //lap socket io vao day
                            console.log('edit success');
                            close(null);
                        }).catch(err => {
                            console.log('edit user fail', err);
                        })
                }
            }
        }
        ModalService.showModal({
            templateUrl: 'dialogs/edit-conversation/edit-conversation-modal.html',
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