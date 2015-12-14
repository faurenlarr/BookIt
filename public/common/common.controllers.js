(function() {
  'use strict';
  angular
    .module('bookit')
    .controller('MainController', function(MainService, $state, $scope, $location, $stateParams) {
      var vm = this;

      // checks to see if the user is logged in. redirects to logout if false
      var checkUser = function() {
        MainService.check().success(function(user) {
          console.log("Logged in user: ", user);
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


      vm.toggle = function(){
        var toggleside = $location.url();
        if (toggleside === "/home") {
          $state.go('home.sidepanel');
        } else if (toggleside === '/home/sidepanel') {
          $state.go('home');
        } else if (toggleside === '/band/create') {
          $state.go('createband.sidepanel');
        } else if (toggleside === '/band/create/sidepanel') {
          $state.go('createband');
        } else if (toggleside === '/band/' + $stateParams.bandId + '/sidepanel') {
          $state.go('band');
        } else if (toggleside === '/band/' + $stateParams.bandId) {
          $state.go('band.sidepanel');
        }

      };

    }); //end of main controller


}());
