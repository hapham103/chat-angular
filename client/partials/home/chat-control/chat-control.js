var componentName = 'chatControl';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/chat-control/chat-control-template.html',
        controller: Controller,
        controllerAs: 'chatCtrl'
    });

function Controller(chatService, $on) {
    let self = this;
    function get() {
        // self.curCon = db.curConversation;
        self.title = chatService.curConver.title;
    }
    get();
    $on('changeConversation', function(data) {
        get();
    });
}