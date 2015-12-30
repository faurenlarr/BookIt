(function() {
  'use strict';
  angular
  .module('login')
  .directive('createForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'login/views/createForm.html',
      link: function(scope, element, attributes){
        $('input[name="password2"]').on('focus', function() {
          if ($('input[name="password"]').val() != $('input[name="password2"]').val()) {
            $('input[name="password2"]').addClass('noMatchy');
          }
        });

        $('input[name="password2"]').on('focusout', function() {
          if ($('input[name="password"]').val() === $('input[name="password2"]').val()) {
            $('input[name="password2"]').removeClass('noMatchy');
          }
        });

      },
    };
  });
}());
