(function() {
  'use strict';
  angular
  .module('events')
    .factory('EventsService', function($http, _) {

      var getVenues = function() {
        console.log("venues");
      };

      return {
        getVenues: getVenues
      };
    })
}());
