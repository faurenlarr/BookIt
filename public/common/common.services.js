(function() {
  'use strict';
  angular
    .module('bookit')
    .factory('MainService', function($http, _) {

      var check = function() {
        var url = '/get-user';
        return $http.get(url);
      };

      var endSession = function(user) {
        var url = '/logout';
        return $http.post(url, user);
      };

      return {
        check: check,
        endSession: endSession
      };
    });



}());
