(function() {
  'use strict';
  angular
    .module('login')
    .controller('LoginController', function($scope, LoginService, $state) {

      var vm = this;

      vm.login = function(user) {

        LoginService.login(user).then(function(data) {
          $state.go('main.home');
        }, function() {
          vm.noUser = true;
          setTimeout(function() {
            vm.noUser = false;
          }, 1000);
        });
      };


      vm.createNewUser = function(user) {

        if (user.password != user.password2) {
          vm.pwMatchErr = true;
          setTimeout(function() {
            vm.pwMatchErr = false;
          }, 1000);
        } else {
          LoginService.newUser(user).success(function() {
            $state.go('main.home');
          });
        }

      };

    })
    .controller('EditAccountController', function($scope, $state, $stateParams, MainService, LoginService) {

      var vm = this;

      var userInfo = function() {
        MainService.check().success(function(user) {
          vm.currentUser = user;
          vm.currentUser.password = '';
        });
      };

      userInfo();

      vm.updateAccount = function(user) {
        if (user.password === user.password2) {
          LoginService.updateUser(user).success(function(data) {
            vm.updateAlert = true;
          });
        } else {
          vm.pwMatchErr = true;
          setTimeout(function() {
            vm.pwMatchErr = false;
          }, 1000);
        }

      };

      vm.back = function() {
        $state.go('^.home');
      };

      vm.removeAccount = function(user) {
        LoginService.deleteAccount(user).then(function() {
          $state.go('login');
        });
      };

    });


}());
