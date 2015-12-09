(function() {
  'use strict';
  angular
    .module('bookit')
    .directive('navBar', function() {
      return {
        restrict: 'E',
        templateUrl: 'common/views/navigation.html',
        transclude: true
      }
    })



}());
