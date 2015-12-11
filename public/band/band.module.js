(function() {
  'use strict';
  angular
  .module('band', [
    'ui.router',
  ])
  .config(function($stateProvider) {
    $stateProvider
    .state('band', {
      url: '/band',
      templateUrl: 'band/views/bandDetails.html',
      controller: 'BandController as BController'
    })
  
    .state('createband', {
      url: '/band/create',
      templateUrl: 'band/views/createBand.html',
      controller: 'BandController as BController'
    });
  });




}());
