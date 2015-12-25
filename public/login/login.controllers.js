(function() {
  'use strict';
  angular
    .module('login')
    .controller('LoginController', function($scope, LoginService, $state) {

      var vm = this;

      vm.login = function(user) {

        LoginService.login(user).success(function(data) {
          $state.go('main.home');
        });
      };


      vm.createNewUser = function(user) {
        LoginService.newUser(user).success(function() {
          $state.go('main.home');
        });
      };

    })
    .controller('EditAccountController', function($scope, $state, $stateParams, MainService, LoginService) {

      var vm = this;

      var userInfo = function() {
        MainService.check().success(function(user) {
          vm.currentUser = user;
        });
      };

      userInfo();

      vm.updateAccount = function(user) {
        LoginService.updateUser(user).success(function(data) {
          vm.updateAlert = true;
        });
      };

      vm.back = function() {
        $state.go('^.home');
      };

      vm.removeAccount = function(user) {
        console.log("delete user: ", user);
      };

    });


}());
