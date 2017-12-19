var componentName = 'conversationList';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-list/conversation-list-template.html',
        controller: Controller,
        controllerAs: 'conversationList'
    });

function Controller(chatService, $emit) {
    let self = this;
    self.conversations = chatService.listConver;
    
    $('#list').height($('body').height() - 50);
    $(window).resize(function () {
        $('#list').height($('body').height() - 50);
    });
    this.onchangeConversation = function(conver, index) {
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
    // console.log('list con: ', socket.id);
}