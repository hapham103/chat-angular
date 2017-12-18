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
        // self.curUser = chatService.curUser;
        // let tem; let first = 0;
        // self.messages.forEach(function (mes) {
        //     if (first == 0) {
        //         tem = mes.sender_id;
        //         first--;
        //     }
        //     if (mes.sender_id == self.curUser.id) {
        //         $('#list-message').append('<div class="cur"><span>' + mes.message + '</span></div>');
        //     } else {
        //         if (tem != mes.sender_id || first == -1)
        //             $('#list-message')
        //                 .append('<div class="chat"><img class="img-circle" style="width: 28px; height: 28px" src="'
        //                 + chatService.getUser(mes.sender_id).avatar
        //                 + '"><span>'
        //                 + mes.message +
        //                 '</span></div>');
        //         else
        //             $('#list-message')
        //                 .append('<div class="chat"><span>'
        //                 + mes.message +
        //                 '</span></div><div style="clear: both"></div>');
        //     }
        //     tem = mes.sender_id;
        //     first--;
        // });
        // console.log('get success'); 
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
        if (id != self.curUser.id && id == self.listMess[index + 1].sender_id)
            return true;
        else return false;
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
    $on('changeConversation', function () {
        console.log('chatform: ', chatService.curConver);
        if (self.curConver != chatService.curConver) {
            console.log('diff');

            // $('#list-message').html('');
            get();
        }
    });

    $('textarea').keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            socket.emit('sendMessage', { content: $('textarea').val(), room: self.curCon, sender_id: self.curUser.id });
            e.preventDefault();
            $('textarea').val('');
        }
    });
    socket.on('reciveMessage', function (data) {
        // chatService.listConver[chatService.getPosConver(data.room.id)].Messages.push({
        //     sender_id: data.sender_id,
        //     message: data.content
        // });
        if (self.curCon.id == data.room.id) {
            $('#list-message').html('');
            get();
        }
    });
    
}