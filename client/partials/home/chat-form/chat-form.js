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

function Controller(chatService, $on) {
    let self = this;
    this.curConver = chatService.curConver;
    this.listMess = chatService.listMess;
    this.curUser = chatService.curUser;
    function get() {
        $(document).ready(function (params) {
            $(function () {
                let scr = $('#list-message');
                scr.scrollTop(scr[0].scrollHeight);
            });
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
    $on('changeConversation', function (data) {
        console.log('chatform: ', data);
        if (self.curConver != chatService.curConver) {
            console.log('diff');

            // $('#list-message').html('');
            get();
        }
    });

    $('textarea').keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            var content = $('textarea').val().replace("\n", "<br>");
            var message = {
                message: content,
                message_type: 'text',
                sender_id: self.curUser.id
            }
            chatService.sendMessage(self.curConver.id, message)
                .then(function (mess) {
                    console.log("send message success");
                }).catch(function (err) {
                    console.log('err', err);
                })
            socket.emit('sendMessage', { content: content, room: self.curConver, sender: self.curUser });
            e.preventDefault();
            $('textarea').val('');
            
        }
    });
    
    socket.on('receiveMessage', function (data) {
        console.log('client reciveMessage');
        
        if(self.curConver.id == data.room.id) {
            chatService.listMess.push({
                message_type: "text",
                message: data.content,
                sender_id: data.sender.id,
                conversation_id: data.room.id,
                User: data.sender
            });
            console.log('curUser', self.curUser.username);
            get();
            console.log('add mess => listmess: ', self.listMess);
        
        }
    });
    
}