(function() {
  'use strict';
  angular
    .module('login')
    .factory('LoginService', function($http, moment, _) {

<<<<<<< HEAD
      var login = function() {

   };

   return {
     login: login
   };
   
    });
=======
      var login = function(user) {
        console.log(user);
      };

      var newUser = function(user) {
        var url = '/create-account';
        $http.post(url, user);
        };

      return {
        login: login,
        newUser: newUser
      };
    })
>>>>>>> 6cb74b0c82951a7d7c8a887de7dce1c908cd4497


}());
