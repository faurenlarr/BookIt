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
    .directive('sidePanel', function() {
      return {
        restrict: 'E',
        templateUrl: 'common/views/sidePanel.html',
        link: function(scope,el,attr) {

        $('.fa-bars').on('click', function(event) {
          event.preventDefault();
          $('.sidepanel').toggleClass('hidden');
        });
  
        }
      };
    });
}());
