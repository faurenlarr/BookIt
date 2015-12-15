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
        controller: function($scope) {
          $scope.details = false;
          $scope.showDetails = function() {
            if ($scope.details === false) {
              $scope.details = true;
            } else if ($scope.details === true) {
              $scope.details = false;
            }
          };
        }
      };
    });
}());
