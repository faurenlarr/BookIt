(function() {
  'use strict';
  angular
    .module('events', [
      'ui.router'
    ])
    .config(function($stateProvider) {
      $stateProvider
      .state('main.book', {
        url: '/book',
        views: {
          'chewy': {
            templateUrl: 'events/views/searchForm.html',
            controller: 'EventsController as EController'
          }
        }
      })
    })


}());
