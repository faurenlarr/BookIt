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

      var addEvent = function(bandId, e) {
        var url = 'add-event/' + bandId;
        return $http.post(url, e);
      };

      return {
        getVenues: getVenues,
        getCalendar: getCalendar,
        addEvent: addEvent
      };
    })
}());
