angular.module('chat-app')
        .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
angular.module('chat-app')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('home');
            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: './partials/login/login-template.html',
                    controller: 'loginCtrl as loginCtrl'
                })
                .state('home', {
                    url: '/home',
                    views: {
                        "": {
                            templateUrl: './partials/home/home.html'
                        }
                    }
                });

            // use the HTML5 History API
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        });