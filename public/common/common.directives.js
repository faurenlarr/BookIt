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
    .directive('footer', function(){
      return {
        restrict: 'E',
        templateUrl: 'common/views/footer.html',
        transclude:true,

      };
    })

    .directive('homepage', function(){
      return {
        restrict: 'E',
        templateUrl: 'common/views/homepage.html',
        transclude: true
      };
    });
}());
