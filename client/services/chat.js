angular.module('chat-app').service('chatService', chat);
function chat ($http, $window, authentication) {
    // var token = authentication.getToken();
    // var payload = JSON.parse($window.atob(token.split('.')[1]));

    var defaultImage = "avatar/default_group.jpg";
    var getUserList = function() {
        return $http.get('/api/users', {
            headers: { 'Authorization': authentication.getToken()}
        });
    }
    var getConversationList = function(){
        var token = authentication.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log('payload.email: ', payload.email);
        return $http.get('/api/conversationlist/' + payload.email,  {
            headers: {'Authorization': token}
        });
    }
    
    var getConversation = function(conversationid){
        return $http.get('/api/conversations/'+ conversationid, {
            headers: { 'Authorization': authentication.getToken()}
        });
    }

    var getMessages = function(conversationid){
        return $http.get('/api/conversations/'+ conversationid +'/messages', {
            headers: { 'Authorization': authentication.getToken()}
        })
    }
    
    var sendMessage = function (conversationid, message){
        return $http.post('/api/conversations/'+conversationid + '/messages/new', message, {
            headers: {
                'Authorization': authentication.getToken()
            }
        });
    }

    var createConversation = function(conversation) {
        conversation.avatar = defaultImage;
        return $http.post('/api/conversations/new', conversation, {
            headers: {
                'Authorization': authentication.getToken()
            }
        });
    }
    var updateConversation = function(conversationid, newinfo) {
        return $http.put('/api/conversations/' + conversationid, newinfo, {
            headers: {
                'Authorization': authentication.getToken()
            }
        });
    }
    var editUser = function (userid, newuser) {
        console.log('editUser called');
        return $http.put('/api/users/'+ userid, newuser, {
            headers: {
                "Authorization": authentication.getToken()
            }
        })
    }
    var addUserToConversation = function(conversationid, newuser){
        return $http.put('/api/conversations/' + conversationid + '/add', newuser, {
            headers: {
                'Authorization': authentication.getToken()
            }
        });
    }
    var curUser = {};
    var listConver = [];
    var curConver = {};
    var listMess = [];
    var listUser = [];
    var refresh = function(){
        curUser = {};
        listConver = [];
        curConver = {};
        listMess = [];
        listUser = [];
        getUserList().then(function (users) {
            listUser = users.data;
            console.log('listUser:', listUser);
        })
    }
    
    refresh();
    
    var getUser = function (id) {
        for( let i=0; i<listUser.length; i++ )
            if( listUser[i].id == id )
                return listUser[i];
    }
    // var getPosConver = function(id) {
    //     for (let i = 0; i < listConver.length; i++)
    //         if (listConver[i].id == id)
    //             return i;
    // }
   
    return {
        listUser: listUser,
        curUser: curUser,
        listConver: listConver,
        curConver: curConver,
        listMess: listMess,
        getUser: getUser,
        getUserList: getUserList,
        // getPosConver: getPosConver,
        createConversation: createConversation,
        getConversation: getConversation,
        getConversationList: getConversationList,
        getMessages: getMessages,
        updateConversation: updateConversation,
        editUser: editUser,
        addUserToConversation: addUserToConversation,
        sendMessage: sendMessage,
        refresh: refresh
    }
}