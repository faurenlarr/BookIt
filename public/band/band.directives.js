(function() {
  'use strict';
  angular
    .module('band')
      .directive('addBandForm', function() {
        return {
          restrict: 'E',
          templateUrl: 'band/views/addForm.html',
          link: function(scope,el,attr) {

          }
        };
      });
}());
