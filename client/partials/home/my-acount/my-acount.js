var componentName = 'myAcount';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'partials/home/my-acount/my-acount-template.html',
        controller: Controller,
        controllerAs: 'myAcount'
    });

function Controller(authentication, $location, chatService) {
    let self = this;
    self.avatarUrl = chatService.curUser.avatar;
    self.username = chatService.curUser.username;

    self.logout = function () {
        authentication.logout();
        $location.path('/');
    }
}