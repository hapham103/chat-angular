angular.module('chat-app').service('chatService', chat);
function chat ($http, $window) {
    var token = $window.localStorage['chatapp-token'];
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    console.log('payload.id', payload.id);
    var getUserList = function() {
        return $http.get('/api/users', {
            headers: {'Authorization': token}
        });
    }
    var getConversationList = function(){
        return $http.get('/api/conversationlist/' + payload.email,  {
            headers: {'Authorization': token}
        });
    }
    
    var getConversation = function(conversationid){
        return $http.get('/api/conversations/'+ conversationid, {
            headers: {'Authorization': token}
        });
    }

    var getMessages = function(conversationid){
        return $http.get('/api/conversations/'+ conversationid +'/messages', {
            headers: {'Authorization': token}
        })
    }
    
    var sendMessage = function (conversationid, message){
        return $http.post('/api/conversations/'+conversationid + '/messages/new', message, {
            headers: {
                'Authorization': token
            }
        });
    }

    var createConversation = function(conversation) {
        return $http.post('/api/conversations/new', conversation, {
            headers: {
                'Authorization': token
            }
        });
    }
    // var updateConversation = function(conversationid, newinfo) {
    //     return $http.put('/api/conversation/' + conversationid, newinfo, {
    //         headers: {
    //             'Authoriation': token
    //         }
    //     });
    // }
    var addUserToConversation = function(conversationid, newuser){
        return $http.put('/api/conversations/' + conversationid + '/add', newuser, {
            headers: {
                'Authorization': token
            }
        });
    }
    
    return {
        getUserList: getUserList,
        createConversation: createConversation,
        getConversation: getConversation,
        getConversationList: getConversationList,
        getMessages: getMessages,
        // updateConversation: updateConversation,
        addUserToConversation: addUserToConversation,
        sendMessage: sendMessage
    }
}