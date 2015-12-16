(function() {
  'use strict';
  angular
    .module('events', [
      'ui.router'
    ])
    .config(function($stateProvider) {
      $stateProvider
      .state('main.show', {
        url: '/show/:bandId',
        views: {
          'chewy': {
            templateUrl: 'events/views/show.html',
            controller: 'EventsController as EController'
          }
        }
      })
      .state('main.tour', {
        url: '/tour',
        views: {
          'chewy': {
            templateUrl: 'events/views/tour.html',
            controller: 'EventsController as EController'
          }
        }
      })
      .state('main.showcalendar', {
        url: '/showcalendar/:venueId',
        views: {
          'chewy': {
            templateUrl: 'events/views/calendarView.html',
            controller: 'CalendarCtrl'
          }
        }
      });
    });



}());
