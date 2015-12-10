(function() {
  'use strict';
  angular
    .module('login')
    .controller('LoginController', function($scope, LoginService, $state) {

      var vm = this;

      vm.login = function(user) {
        LoginService.login(user).success(function() {
          $state.go('band');
        });
      };

      vm.createNewUser = function(user) {
        LoginService.newUser(user).success(function() {
          $state.go('band');
        });
      };

    });


}());
