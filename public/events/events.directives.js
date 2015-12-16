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
            $state.go('^.showcalendar',{venueId: id});
          };

        }
      };
    })
    .directive('dayBlock', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/dayBlock.html',
        transclude: true,
        controller: function($scope) {

        },
        link: function(scope,el,attr) {
        }
      };
    });
}());
