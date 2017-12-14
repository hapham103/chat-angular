var componentName = 'myAcount';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'partials/home/my-acount/my-acount-template.html',
        controller: Controller,
        controllerAs: 'myAcount'
    });

function Controller(authentication) {
    let self = this;
    authentication.getCurrentUser()
        .then(function(user){
            console.log('user', user);
            self.username = user.data.username;
            self.avatarUrl = user.data.avatar;
        }).catch(err=> {
            console.log('err',err);
        })
}