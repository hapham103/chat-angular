var componentName = 'conversationList';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/components/conversation-list/conversation-list-template.html',
        controller: Controller,
        controllerAs: 'conversationList'
    });

function Controller(db, $emit) {
    let self = this;
   
    this.conversations = db.conversations;
    $('#list').height($('body').height() - 50);
    $(window).resize(function () {
        $('#list').height($('body').height() - 50);
    });
    this.onchangeConversation = function(conver) {
        db.curConversation = conver;
        $emit('changeConversation', db.curConversation.id);
    };
    // console.log('list con: ', socket.id);
}