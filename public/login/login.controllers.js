(function() {
  'use strict';
  angular
    .module('login')
    .controller('LoginController', function($scope, LoginService) {

      var vm = this;

      vm.login = function(user) {
        LoginService.login(user);
      };

      vm.createNewUser = function(user) {
        LoginService.newUser(user);
      };

    });


}());
