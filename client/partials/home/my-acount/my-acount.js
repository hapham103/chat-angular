var componentName = 'myAcount';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'partials/home/my-acount/my-acount-template.html',
        controller: Controller,
        controllerAs: 'myAcount'
    });

function Controller(apiService) {
    let self = this;
    apiService.getCurrentUser()
        .then(function(user){
            console.log('user', user);
            self.username = user.data.username;
            self.avatarUrl = user.data.avatar;
        })
    // this.username = apiService.currentUser.username;
    // this.avatarUrl = apiService.currentUser.avatar;
}