(function() {
  'use strict';
  angular
  .module('events')
    .directive('venueBlock', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/venueBlock.html',
        link: function(scope,el,attr) {

        },
        controller: function($scope, $state, $stateParams, EventsService) {

          $scope.details = false;

          $scope.showDetails = function() {
            if ($scope.details === false) {
              $scope.details = true;
            } else if ($scope.details === true) {
              $scope.details = false;
            }
          };

          $scope.viewSchedule = function(venue) {
            var venue = venue;
            var id = venue.id;
            var bandId = $stateParams.bandId;
            $state.go('^.showcalendar',{venueId: id, bandId: bandId});
          };

        }
      };
    })
    .directive('dayBlock', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/dayBlock.html',
        transclude: true,
        controller: function($scope, EventsService, MainService) {
          $scope.view = function(day) {
            // var show = {};
            // MainService.getBands()
            console.log(day);
          };
          $scope.init = function(day) {
          //  console.log(document.getElementById('first'));

          };
        },
        link: function(scope,el,attr) {

        }
      };
    });
}());
