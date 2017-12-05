var componentName = 'chatForm';
angular.module(componentName, ['ngEventEmitter'])
        .component(componentName, {
            templateUrl: 'partials/home/chat-form/chat-form-template.html',
            controller: Controller,
            controllerAs: 'chat'
        });

function Controller(db, $on) {
    let self = this;
    this.curCon;
    this.curUser;
    
    console.log('chat: ', socket.id);
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
       
        self.curCon = db.curConversation;
        self.messages = self.curCon.messages;
        self.curUser = db.curUser;
        let tem;let first = 0;
        self.messages.forEach(function (mes) {
                if(first==0){
                    tem = mes.senderId;
                    first--;
                }
                if(mes.senderId == self.curUser.id) {
                    $('#list-message').append('<div class="cur"><span>' + mes.message + '</span></div>');
                }else{
                    if(tem != mes.senderId || first == -1)
                        $('#list-message')
                            .append('<div class="chat"><img class="img-circle" style="width: 28px; height: 28px" src="' 
                                        + db.getUser(mes.senderId).avatarUrl 
                                        + '"><span>'
                                        + mes.message + 
                                    '</span></div>');
                    else
                        $('#list-message')
                            .append('<div class="chat"><div style="float: left;width: 28px; height: 28px"></div><span>'
                                        + mes.message +
                                        '</span></div><div style="clear: both"></div>');
                }
                tem = mes.senderId;
                first--;
        });
    }
    get();
    socket.on('reciveMessage', function(data){
        console.log("cur: " +self.curUser.id + "sender: "+data.sender_id + data.content);
        db.conversations[db.getConversation(data.room_id).pos].messages.push({
            senderId: data.sender_id,
            message: data.content
        });
        if(self.curCon.id == data.room_id){
            $('#list-message').html('');
            get();
        }
    });
    $('textarea').keypress(function(e){
        if (e.which == 13 && !e.shiftKey) {
            socket.emit('sendMessage', {content: $('textarea').val(), room_id: self.curCon.id, sender_id: self.curUser.id});
            e.preventDefault();
            $('textarea').val('');
        }
    })
    $on('changeConversation', function() {
        if(self.curCon != db.curConversation) {
            $('#list-message').html('');
            get();
        }
    });
 
}