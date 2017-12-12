var componentName = 'conversationList';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-list/conversation-list-template.html',
        controller: Controller,
        controllerAs: 'conversationList'
    });

function Controller(apiService, $emit) {
    let self = this;
    
    apiService.getCurrentUser()
        .then(function(user){
            self.conversations = user.data.Conversations;
        }).catch(function(){
            console.log('no user found');
        })
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