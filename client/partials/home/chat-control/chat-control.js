var componentName = 'chatControl';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/chat-control/chat-control-template.html',
        controller: Controller,
        controllerAs: 'chatCtrl'
    });

function Controller(chatService, $on, $timeout) {
    let self = this;
    var get = function() {
        self.curCon = chatService.curConver;
        self.title = chatService.curConver.title;
        $timeout(get);
    }
    $timeout(get);
    get();
    $on('changeConversation', function(data) {
        get();
    });

    $on('addConver', function (params) {
        get();
    })
    $on('changeCurCon', function (params) {
        get();
    })
    socket.on('addUserToConver', function(data){
        if(self.curCon.id == data.conver.id){
            get();
        }
    })
}