(function() {
  'use strict';
  angular
  .module('login', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    $stateProvider
    .state('login', {
      url: '/login/',
      templateUrl: 'login/views/login.html',
      controller: 'LoginController as LController'
    })
    .state('createuser', {
      url: '/createuser',
      templateUrl: 'login/views/createUser.html',
      controller: 'LoginController as LController'
    })
    .state('main.editaccount', {
      url: '/editaccount/:userId',
      views: {
        'chewy': {
          templateUrl: 'login/views/editAccount.html',
          controller: 'EditAccountController as EAController'
        }
      }
    });
  });


}());
