(function() {
  'use strict';
  angular
    .module('bookit')
    .controller('MainController', function(MainService, $state, $scope) {
      var vm = this;

      var checkUser = function() {
        MainService.check().success(function(user) {
          console.log("Logged in user: ", user);
        }).error(function() {
          $state.go('login');
        });
      };

        checkUser();

    });


}());
