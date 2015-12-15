(function() {
  'use strict';
  angular
  .module('band', [
    'ui.router',
  ])
  .config(function($stateProvider) {

    $stateProvider
    .state('main.createband', {
      url: '/createband',
      views: {
        'chewy': {
          templateUrl: 'band/views/createBand.html',
          controller: 'BandController as BController'
        }
      }
    })
    .state('main.band', {
      url: '/band/:bandId',
      views: {
        'chewy': {
          templateUrl: 'band/views/bandDetails.html',
          controller: 'DetailController as DController'
        }
      }
    })

    .state('main.updateband', {
      url: '/updateband/:bandId',
      views: {
        'chewy': {
          templateUrl: 'band/views/updateBand.html',
          controller: 'UpdateBandController as UBController'
        }
      }
    });



  });




}());
