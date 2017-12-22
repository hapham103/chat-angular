var componentName = 'conversationDetails';
angular.module(componentName, ['ngEventEmitter'])
    .component(componentName, {
        templateUrl: 'partials/home/conversation-details/conversation-details-template.html',
        controller: Controller,
        controllerAs: 'details'
    });

function Controller(chatService, $on, DialogService, $timeout) {
    let self = this;
    let a=[];
    function get() {
        self.curConver = chatService.curConver;
        self.title = self.curConver.title;
        self.avatarUrl = self.curConver.avatar;
        a = self.curConver.Users;
        self.participants = self.curConver.Users;
        
        self.isGroup = function(){
            if(self.curConver.Users.length>1)
                return true;
            else return false;
        }
        
        self.chat = self.curConver.Users[0];
      
    }
    var getPar = function (params) {
        self.participants = a;
        $timeout(getPar);
    }
    $timeout(getPar);
    get();
    $('#details').height($('body').height() - 50);

    
    $on('changeConversation', function (data) {
        get();
        self.curConver = chatService.curConver;
        self.title = self.curConver.title;
        self.avatarUrl = self.curConver.avatar;
        a = self.curConver.Users;
        self.participants = self.curConver.Users;

        self.isGroup = function () {
            if (self.curConver.Users.length > 1)
                return true;
            else return false;
        }

        self.chat = self.curConver.Users[0];
        console.log('test',chatService.curConver);
    });
    $on('addConver', function () {
        get();
    });
    $on('changeCurCon', function () {
        get();
    });
    socket.on('addUserToConver', function(data){
        if(self.curConver.id == data.conver.id){

            get();
            console.log('need: ', data);
            data.users.forEach(element => {
                a.push(element);
            });
            self.participants = a;
        }
    })
    
    self.showModal = function () {
        console.log('show modal');
        DialogService.addParticipant();
    }
}