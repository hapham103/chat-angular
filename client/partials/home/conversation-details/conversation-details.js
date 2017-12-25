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
    this.curConver = {};
    this.title = "";
    this.avatarUrl ="";
    
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
        
        console.log('test',self.curConver);
    }
    var getPar = function (params) {
        self.participants = a;
        $timeout(getPar);
    }
    $timeout(getPar);
    get();
    console.log('fasdf0: ', self.title);
    this.has = function () {
        if (self.curConver != undefined)
            return true;
        return false;
    }
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
    });
    $on('addConver', function () {
        console.log("ok");
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
    
    self.editConversation = function () {
        console.log("edit Conversation");
        DialogService.editConversation();
    }
    self.showModal = function () {
        console.log('show modal');
        DialogService.addParticipant();
    }
}
