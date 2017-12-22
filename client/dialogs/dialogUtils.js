angular.module('chat-app').service('DialogService', DialogUtils);

function DialogUtils(ModalService, chatService, $timeout, authentication, $emit, uploadService) {
    let myDialogs = new Object();
    myDialogs.newConversation = function () {
        function ModalController(close) {

            var self = this;

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

            authentication.getCurrentUser()
                .then(user => {
                    self.currentUser = user.data;
                    console.log('user.data', user.data)
                }).catch(err => {
                    console.log('err', err);
                })

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
                    let conversationInfo = {
                        title: conversationName,
                        members: members,
                        avatar: "x"
                    }
                    doSubmit(conversationInfo);
                }
            };
            var doSubmit = function(info) {
                chatService.createConversation(info)
                    .then(function(con){
                        console.log('con', con);
                        $emit('addConver');
                        chatService.listConver.push(con);
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

            var self = this;

            chatService.getUserList()
                .then(users => {
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

            authentication.getCurrentUser()
                .then(user => {
                    self.currentUser = user.data;
                    console.log('user.data', user.data)
                }).catch(err => {
                    console.log('err', err);
                })

            self.onSubmit = function () {
                self.formError = "";
                if (!self.receivers) {
                    console.log('try again');
                    return false;
                } else {
                    let members = [];
                    members.push(self.currentUser.id)
                    let conversationName = self.currentUser.username;
                    for (r of self.receivers) {
                        members.push(r.id);
                        conversationName = conversationName + ", " + r.username;
                    }
                    let conversationInfo = {
                        title: conversationName,
                        members: members,
                        avatar: "x"
                    }
                    doSubmit(conversationInfo);
                }
            };
            var doSubmit = function (info) {
                chatService.createConversation(info)
                    .then(function (con) {
                        console.log('con', con);
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
                                    //lap socket io vao day
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
    return myDialogs;
}