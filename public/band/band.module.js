(function() {
  'use strict';
  angular
  .module('band', [
    'ui.router',
  ])
  .config(function($stateProvider) {
    $stateProvider

    .state('createband', {
      url: '/band/create',
      templateUrl: 'band/views/createBand.html',
      controller: 'BandController as BController'
    })
    .state('createband.sidepanel', {
      url: '/sidepanel',
      views: {
        'cbside': {
          templateUrl: 'common/views/sidePanel.html'
        }
      }
    })

    .state('band', {
      url: '/band/:bandId',
      templateUrl: 'band/views/bandDetails.html',
      controller: 'DetailController as DController'
    })
    
    .state('band.sidepanel', {
      url: '/sidepanel',
      views: {
        'bdside': {
          templateUrl: 'common/views/sidePanel.html'
        }
      }

    });

  });




}());
