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
            var name = venue.displayName;
            $state.go('^.showcalendar',{venueId: id, bandId: bandId, venueName: name});
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
          $scope.checkAvailability = function(day) {
            console.log(day);
          };
          //paywall
          $scope.paywall = 1;
          $scope.setPaywall = function(item){
            $scope.paywall = item;
          };
          $scope.isPaywall = function(item, day){
            if(item === $scope.paywall){
              return true;
            }else{
              return false;
            }
          };

        },
        link: function(scope,el,attr) {

        }
      };
    });
}());
