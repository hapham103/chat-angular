var componentName = 'myAcount';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'partials/home/my-acount/my-acount-template.html',
        controller: Controller,
        controllerAs: 'myAcount'
    });

function Controller(authentication, chatService, $location, DialogService, $timeout) {
    let self = this;
    var get = function () {
        self.avatarUrl = chatService.curUser.avatar;
        self.username = chatService.curUser.username;
        $timeout(get);
    }
    $timeout(get);
    

    self.logout = function () {
        authentication.logout();
        $location.path('/');
    }
    self.showModal = function(){
        console.log('show modal');
        DialogService.newConversation();
    }
    self.editUser = function() {
        console.log('editUser');
        DialogService.editUser();
    }
}