var componentName = 'myAcount';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'partials/home/components/my-acount/my-acount-template.html',
        controller: Controller,
        controllerAs: 'myAcount'
    });

function Controller(db) {
    let self = this;
    this.username = db.curUser.username;
    this.avatarUrl = db.curUser.avatarUrl;
}