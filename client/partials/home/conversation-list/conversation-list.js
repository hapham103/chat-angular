var componentName = 'conversationList';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-list/conversation-list-template.html',
        controller: Controller,
        controllerAs: 'conversationList'
    });

function Controller(chatService, $emit, $on, $timeout) {
    let self = this;
    self.conversations = chatService.listConver;
    this.lastMess = function (index) {
        if (self.conversations[index].Messages.length >0 ){
            if (self.conversations[index].Messages[self.conversations[index].Messages.length - 1].message_type == "text") {
                return self.conversations[index].Messages[self.conversations[index].Messages.length - 1].message;
            }
            else
                return self.conversations[index].Messages[self.conversations[index].Messages.length - 1].message.slice(19);
        }
        return "";
    };
    
    var last = function() {
        self.conversations.forEach(function(conver, i){
        self.lastMess(i);
    });
    $timeout(last);
}
$timeout(last);
    socket.on('addListConver', function (data) {
        console.log('add conversation');
        socket.emit('joinRoomAdded', data.conver);
        for (let i =0; i< data.receivers.length; i++)
            if(data.receivers[i].id == chatService.curUser.id){
                chatService.listConver.unshift(data.conver);
                self.conversations = chatService.listConver;
                break;
            }
        
    });
    var g = function () {
        self.conversations = chatService.listConver;
        
        $timeout(g);
    };
    $timeout(g);
    $('#list').height($('body').height() - 50);
    $(window).resize(function () {
        $('#list').height($('body').height() - 50);
    });
    
    this.hasMess = function (index) {
        if (self.conversations[index].Messages != undefined)
            if (self.conversations[index].Messages.length > 0)
                return true;
        return false;
    }
    this.onchangeConversation = function(conver, index) {
        $('textarea').focus();
        chatService.getConversation(conver.id)
            .then(function(conver){
                if (conver.data.Users.length == 2) {
                    if(conver.data.Users[0].id != chatService.curUser.id) {
                        conver.data.title = conver.data.Users[0].username;
                        conver.data.avatar = conver.data.Users[0].avatar;
                        conver.data.Users.pop();
                    }
                    else{
                        conver.data.title = conver.data.Users[1].username;
                        conver.data.avatar = conver.data.Users[1].avatar;
                        conver.data.Users.shift();
                    }
                }
                chatService.curConver = conver.data;
                chatService.listMess = chatService.curConver.Messages;
                chatService.listConver[index] = chatService.curConver;
                console.log('change conver => listMess: ', chatService.listMess);
                $emit('changeConversation', chatService.curConver);
                
            }).catch(function (err) {
                
                console.log('err', err);
            })
        

    };
    socket.on('receiveMessage', function (data) {
        console.log('list conver receive: ', data);
        if(data.sender.id!=chatService.curUser.id){
        for(let i=0;i<self.conversations.length;i++){
            if(self.conversations[i].id==data.conversation.id){
                // let con = self.conversations.splice(i,1);
                // self.conversations.unshift(con);
                // self.conversations[i].Messages.push({
                //     message_type: "text",
                //     message: data.content,
                //     sender_id: data.sender.id,
                //     conversation_id: data.room.id,
                //     User: data.sender
                // })
                self.lastMess(0);
                break;
            }
        }
        }
    });
    socket.on('addUserToConver', function(data){
        let isUser = true;
        for(let i =0; i<data.users.length; i++)
            if(data.users[i].id == chatService.curUser.id)
            {
                isUser = false;
                break;
            }
            if(isUser)
                for (let i = 0; i < self.conversations.length; i++) {
                    if(self.conversations[i].id == data.conver.id){
                        self.conversations[i].title = data.conver.title;
                    }
                }
            else{
                self.conversations.push(data.conver);
            }
    })
    // console.log('list con: ', socket.id);
}