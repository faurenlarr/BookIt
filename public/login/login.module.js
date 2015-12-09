(function() {
  'use strict';
  angular
  .module('bookit.login', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/views/login.html',
      controller: 'LoginController as LController'
    })
    .state('login.createuser', {
      url: '/login/createuser',
      templateUrl: 'login/views/createUser.html',
      controller: 'LoginController as LController'
    })
  })




}());
