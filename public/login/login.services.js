(function() {
  'use strict';
  angular
    .module('login')
    .factory('LoginService', function($http, moment, _) {

      var login = function(user) {
        var url = '/login';
        return $http.post(url, user);
      };

      var newUser = function(user) {
        var url = '/create-account';
        return $http.post(url, user);
        };

      return {
        login: login,
        newUser: newUser
      };

    });


}());
