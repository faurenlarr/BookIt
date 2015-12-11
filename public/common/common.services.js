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

      var getBands = function(userID) {
        var url = '/get-bands/' + userID;
        return $http.get(url);
      };

      return {
        check: check,
        endSession: endSession,
        getBands: getBands
      };
    });



}());
