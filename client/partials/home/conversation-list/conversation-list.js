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
    this.onchangeConversation = function(conver) {
        chatService.curConver = conver;
        chatService.listMess = chatService.curConver.Messages;
        $emit('changeConversation', chatService.curConver);
        $emit('change', conver);
    };
    // console.log('list con: ', socket.id);
}