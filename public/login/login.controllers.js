(function() {
  'use strict';
  angular
    .module('login')
    .controller('LoginController', function($scope, LoginService, $state) {

      var vm = this;

      vm.login = function(user) {
        LoginService.login(user);
      };

      vm.createNewUser = function(user) {
        LoginService.newUser(user).then(function() {
          $state.go('login');
        });
      };

    });


}());
