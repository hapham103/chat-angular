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

        self.curCon = chatService.curConver;
        self.messages = chatService.listMess;
        self.curUser = chatService.curUser;
        let tem; let first = 0;
        self.messages.forEach(function (mes) {
            if (first == 0) {
                tem = mes.sender_id;
                first--;
            }
            if (mes.sender_id == self.curUser.id) {
                $('#list-message').append('<div class="cur"><span>' + mes.message + '</span></div>');
            } else {
                if (tem != mes.sender_id || first == -1)
                    $('#list-message')
                        .append('<div class="chat"><img class="img-circle" style="width: 28px; height: 28px" src="'
                        + chatService.getUser(mes.sender_id).avatar
                        + '"><span>'
                        + mes.message +
                        '</span></div>');
                else
                    $('#list-message')
                        .append('<div class="chat"><div style="float: left;width: 28px; height: 28px"></div><span>'
                        + mes.message +
                        '</span></div><div style="clear: both"></div>');
            }
            tem = mes.sender_id;
            first--;
        });
        console.log('get success'); 
    }
    get();

    $on('changeConversation', function () {
        console.log('chatform: ', chatService.curConver);
        if (self.curCon != chatService.curConver) {
            console.log('diff');

            $('#list-message').html('');
            get();
        }
    });

    socket.on('reciveMessage', function (data) {
        console.log("cur: " + self.curUser.id + "sender: " + data.sender_id + data.content);
        chatService.listConver[chatService.getPosConver(data.room_id)].Messages.push({
            sender_id: data.sender_id,
            message: data.content
        });
        if (self.curCon.id == data.room_id) {
            $('#list-message').html('');
            get();
        }
    });
    $('textarea').keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            socket.emit('sendMessage', { content: $('textarea').val(), room_id: self.curCon, sender_id: self.curUser.id });
            e.preventDefault();
            $('textarea').val('');
        }
    });
}