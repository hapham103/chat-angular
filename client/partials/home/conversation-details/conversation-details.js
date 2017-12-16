var componentName = 'conversationDetails';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-details/conversation-details-template.html',
        controller: Controller,
        controllerAs: 'details'
    });

function Controller(chatService, $on) {
    let self = this;

    function get() {
        self.curCon = chatService.curConver;
        self.title = self.curCon.title;
        self.avatarUrl = self.curCon.avatar;
    }
    get();
    $('#details').height($('body').height() - 50);

    
    $on('changeConversation', function () {
        get();
    });
}