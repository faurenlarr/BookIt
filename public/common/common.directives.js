(function() {
  'use strict';
  angular
    .module('bookit')
    .directive('navBar', function() {
      return {
        restrict: 'E',
        templateUrl: 'common/views/navigation.html',
        transclude: true,
        link: function(scope,element,attr) {

        }

      };
    })
    .directive('homepage', function() {
      return {
        restrict: 'E',
        templateUrl: 'common/views/homepage.html',
        transclude: true,
        link: function(scope,element,attr) {

        }
      };
    });



}());
