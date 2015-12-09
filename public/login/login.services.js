(function() {
  'use strict';
  angular
    .module('login')
    .factory('LoginService', function($http, moment, _) {

      var login = function(user) {
        console.log(user);
      };

      var newUser = function(user) {
        console.log(user);
        };

      return {
        login: login,
        newUser: newUser
      };
    })


}());
