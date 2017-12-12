angular.module('chat-app').service('chat', chat);
function chat ($htpp) {
    var createConversation = function(conversation) {
        return $http.post('/conversations/new', conversation);
    }
    var getConversation = function(conversationid){
        return $http.get('/conversation/'+conversationid);
    }
    var updateConversation = function(conversationid, newinfo) {
        return $http.put('/conversation/' + conversationid, newinfo);
    }
    var addUserToConversation = function(conversationid, newuser){
        return $http.put('/conversation/' + conversationid, newuser);
    }
    var sendMessage = function (conversationid, message){
        return $http.post('/conversation/'+conversationid, message);
    }
    return {
        createConversation: createConversation,
        getConversation: getConversation,
        updateConversation: updateConversation,
        addUserToConversation: addUserToConversation,
        sendMessage: sendMessage
    }
}