(function() {
  'use strict';
  angular
  .module('events')
    .factory('EventsService', function($http, _) {

      var getVenues = function(location) {
        var url = '/search-venues/' + location;
        return $http.get(url);
      };

      var getCalendar = function(id) {
        var url = '/get-calendar/' + id;
        return $http.get(url);
      };

      return {
        getVenues: getVenues,
        getCalendar: getCalendar
      };
    })
}());
