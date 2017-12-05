var componentName = 'chatControl';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/components/chat-control/chat-control-template.html',
        controller: Controller,
        controllerAs: 'chatCtrl'
    });

function Controller(db, $on) {
    let self = this;
    this.curCon;
    this.title;
    function get() {
        self.curCon = db.curConversation;
        self.title = self.curCon.title;
    }
    get();
    $on('changeConversation', function() {
        get();
    });
}