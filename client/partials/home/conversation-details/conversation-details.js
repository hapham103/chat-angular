var componentName = 'conversationDetails';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-details/conversation-details-template.html',
        controller: Controller,
        controllerAs: 'details'
    });

function Controller(db, $on) {
    let self = this;
    this.curCon;
    this.title;
    this.avatarUrl;
    function get() {
        self.curCon = db.curConversation;
        self.title = self.curCon.title;
        self.avatarUrl = self.curCon.avatarUrl;
    }
    get();
    $('#details').height($('body').height() - 50);

    
    $on('changeConversation', function () {
        get();
    });
}