var componentName = 'conversationList';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-list/conversation-list-template.html',
        controller: Controller,
        controllerAs: 'conversationList'
    });

function Controller(chatService, $emit) {
    let self = this;
    chatService.getConversationList()
        .then(function(conversations){
            self.conversations = conversations.data;
        }).catch(err=>{
            console.log('err', err);
        })
    
        var x={
            id: [6,7]
        }
        var   conversation_id= 4;
    
    $('#list').height($('body').height() - 50);
    $(window).resize(function () {
        $('#list').height($('body').height() - 50);
    });
    this.onchangeConversation = function(conver) {
        apiService.curConversation = conver;
        $emit('changeConversation', apiService.curConversation.id);
    };
    // console.log('list con: ', socket.id);
}