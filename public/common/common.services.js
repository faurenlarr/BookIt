(function() {
  'use strict';
  angular
    .module('bookit')
    .factory('MainService', function($http, _) {

      var check = function() {
        var url = '/get-user';
        return $http.get(url);
      };

      return {
        check: check
      };
    })





}());
