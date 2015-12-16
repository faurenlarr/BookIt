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
            console.log("venue: ", venue);
            var venue = venue;
            var id = venue.id;
            $state.go('^.showcalendar',{venueId: id});
          };

        }
      };
    })
    .directive('calendar', function() {
      return {
        restrict: 'e',
        templateUrl: 'events/views/calendarView.html',
        link: function(scope,el,attr) {

        }
      };
    });
}());
