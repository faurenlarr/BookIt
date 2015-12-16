(function() {
  'use strict';
  angular
    .module('bookit')
    .controller('MainController', function(MainService, $state, $scope, $location, $stateParams) {
      var vm = this;

      // checks to see if the user is logged in. redirects to logout if false
      var checkUser = function() {
        MainService.check().success(function(user) {
          vm.currentUser = user;
        }).error(function() {
          $state.go('login');
        });
      };

      // automcatically check for login
         checkUser();

      vm.logout = function() {
        MainService.check().success(function(user) {
          MainService.endSession(user).success(function() {
            $state.go('login');
          });
        });
      };

      // vm.gotoband = function(band) {
      //   var id = band.id;
      //   $state.go('main.show', {bandId:id});
      // };


      // populates the home page with user's bands
      var bands = function() {
        MainService.check().success(function(user) {
          var id = user.id;
          MainService.getBands(id).success(function(bands) {
            vm.bands = bands;
          });
        });
      };

      // automatically checks for bands on page load
      bands();

      vm.goSettings = function() {
        MainService.check().success(function(user) {
          var id = id;
          $state.go('^.editaccount', {bandId: id});
        });
      };


     vm.showBands = function () {
       vm.isShowing = !vm.isShowing;
       bands();
     };

    }); //end of main controller


}());
