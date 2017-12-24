var componentName = 'conversationDetails';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-details/conversation-details-template.html',
        controller: Controller,
        controllerAs: 'details'
    });

function Controller(chatService, $on, DialogService) {
    let self = this;

    function get() {
        self.curConver = chatService.curConver;
        self.title = self.curConver.title;
        self.avatarUrl = self.curConver.avatar;
        self.participants = self.curConver.Users;
        self.isGroup = function(){
            if(self.curConver.Users.length>1)
                return true;
            else return false;
        }
        self.chat = self.curConver.Users[0];
    }
    get();
    $('#details').height($('body').height() - 50);


    $on('changeConversation', function () {
        get();
    });
    $on('addConver', function () {
        get();
    });
    $on('changeCurCon', function () {
        get();
    });
    self.showModal = function () {
        console.log('show modal');
        DialogService.addParticipant();
    }
}
