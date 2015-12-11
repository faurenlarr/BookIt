(function() {
  'use strict';
  angular
  .module('login')
  .directive('createForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'login/views/createForm.html',
      link: function(scope, element, attributes){
        
      },
    };
  });
}());
