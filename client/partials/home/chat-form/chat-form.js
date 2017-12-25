// var componentName = 'chatForm';
// angular.module(componentName, ['ngEventEmitter'])
//         .component(componentName, {
//             templateUrl: 'partials/home/chat-form/chat-form-template.html',
//             controller: Controller,
//             controllerAs: 'chat'
//         });

// function Controller(chatService, $on) {

// }
var componentName = 'chatForm';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/chat-form/chat-form-template.html',
        controller: Controller,
        controllerAs: 'chat'
    });

function Controller(chatService, $on, uploadService, $scope, $timeout) {
    let self = this;
    this.curConver = chatService.curConver;
    this.listMess = chatService.listMess;
    this.curUser = chatService.curUser;
    self.x ="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download";
    function get() {
        $(document).ready(function (params) {
            $(function () {
                let scr = $('#list-message');
                scr.scrollTop(scr[0].scrollHeight);
            });
            $('#list-message').height($('#chat-form').height() - $('#chat').height());
            $('#chat-form').height($('body').height() - 50);
            $('#list-message').height($('#chat-form').height() - $('#chat').height());
            $(window).resize(function () {
                $('#chat-form').height($('body').height() - 50);
                $('#list-message').height($('#chat-form').height() - $('#chat').height());
            });
        });

        self.curConver = chatService.curConver;
        self.listMess = chatService.listMess;
        console.log('chatService.curConver: ', chatService.curConver);
    }
    get();
    var test = function(){
        chatService.listMess = chatService.listMess;
        self.listMess = chatService.listMess;
        $timeout(test);
    }
    $timeout(test);
    this.float = function(id) {
        return (id==self.curUser.id)?"cur":"chat";
    }
    
    this.createAvatar = function(id) {
        return (id == self.curUser.id )? false : true;
    }
    this.showAvatar = function (id, index) {
        if(id!=self.curUser.id && (index==self.listMess.length-1 || id != self.listMess[index+1].sender_id))
            return true;
        else return false;
    }
    this.notShowAvatar = function (id, index) {
        if (index < self.listMess.length-1)
            if (id != self.curUser.id && id == self.listMess[index + 1].sender_id)
                return true;
            else return false;
        return false;
    }
    this.showSenderUsername = function(id, index){
        if (id != self.curUser.id && self.curConver.Users.length > 1){
            if (index == 0)
                return true;
            else
                if (id != self.listMess[index - 1].sender_id )
                    return true;
        }
        else 
            return false;
    }
    this.createTime = function(id){
        if(id==self.curUser.id)
        return true;
        return false;
    }
    this.text = function (type) {
        if(type=="text")
            return true;
        return false;
    }
    this.image = function (type) {
        if (type == "image")
            return true;
        return false;
    }
    this.file = function (type) {
        if (type == "file")
            return true;
        return false;
    }
    socket.on('addListConver', function (data) {
        socket.emit('joinRoomAdded', data);
    })
    $on('changeConversation', function (data) {
        console.log('chatform: ', data);
        if (self.curConver.id != chatService.curConver.id) {
            console.log('diff');

            // $('#list-message').html('');
            get();
        }
    });
    $on('addConver', function (params) {
        if (self.curConver.id != chatService.curConver.id) {
            console.log('diff');
            // $('#list-message').html('');
            get();
        }
    })
    $on('changeCurCon', function (params) {
        if (self.curConver.id != chatService.curConver.id) {
            console.log('diff');
            // $('#list-message').html('');
            get();
        }
    })
    $scope.$watch('chat.dropFiles', function () {
        console.log('watch ok');
        if (self.dropFiles !== undefined) {
            if (self.dropFiles[0].type.indexOf("image/") !== -1) {
                self.sendImage(self.dropFiles);
            } else {
                self.sendFile(self.dropFiles);
            }
            console.log(self.listMess);
        }
    });

    this.sendImage = function (images) {
        var image = images[0];
        console.log('image', image.type);
        var formData = new FormData();
        formData.append('file', image);

        uploadService.uploadImage(formData)
            .then((rs) => {
                var message = {
                    message: rs.data.content,
                    message_type: "image",
                    sender_id: self.curUser.id,
                    createdAt: Date()
                };
                // chatService.listMess.push(message);
                socket.emit('sendMessage', { message: message, conversation: self.curConver, sender: self.curUser });
                chatService.sendMessage(self.curConver.id, message);
            }).catch((err) => {
                console.log("upload image fail", err);
            })
    }

    this.sendFile = function (files) {
        var file = files[0];
        console.log('file', file);
        var formData = new FormData();
        formData.append('file', file);

        uploadService.uploadFile(formData)
            .then((rs) => {
                var message = {
                    message: rs.data.content,
                    message_type: "file",
                    sender_id: self.curUser.id,
                    createdAt: Date()
                };
                socket.emit('sendMessage', { message: message, conversation: self.curConver, sender: self.curUser });
                // chatService.listMess.push(message);
                chatService.sendMessage(self.curConver.id, message)
            }).catch((err) => {
                console.log("upload file fail", err);
            })
    }

    $('textarea').keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            var content = $('textarea').val().replace("\n", "</br>");
            // var content = $('textarea').val();
            var message = {
                message: content,
                message_type: 'text',
                sender_id: self.curUser.id,
                createdAt: Date()
            }
            chatService.sendMessage(self.curConver.id, message)
                .then(function (mess) {
                    console.log("send message success");
                }).catch(function (err) {
                    console.log('err', err);
                })
            socket.emit('sendMessage', { message: message, conversation: self.curConver, sender: self.curUser });
            e.preventDefault();
            $('textarea').val(''); 
        }
    });
    socket.on('addUserToConver', function(data){
        socket.emit('joinRoom', data);
    })
    socket.on('receiveMessage', function (data) {
        console.log('client reciveMessage');
        if(self.curConver.id == data.conversation.id) {
            chatService.listMess.push({
                message_type: data.message.message_type,
                message: data.message.message,
                sender_id: data.message.sender_id,
                conversation_id: data.conversation.id,
                User: data.sender,
                createdAt: data.message.createdAt
            });
            get();
            console.log(self.listMess);
        }else{
            
        }
    });
    
}