angular.module('chat-app', ['myAcount', 'conversationList', 'chatControl', 'chatForm', 'conversationDetails', 'ui.router', 'ngEventEmitter', 'angularModalService', 'ngFileUpload'])
.controller('myCtrl', function() {
        // var __USERINFO = {
        //         username: null,
        //         token: null,
        //         refreshToken: null
        //     };
            
        //     function getAuthInfo() {
        //         __USERINFO.username = window.localStorage.getItem('username');
        //         __USERINFO.token = window.localStorage.getItem('token');
        //         __USERINFO.refreshToken = window.localStorage.getItem('refreshToken');
        //     }
        //     getAuthInfo();
        //     console.log(__USERINFO);
})
;