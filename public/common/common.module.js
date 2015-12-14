(function() {
  'use strict';
  angular
  .module('bookit', [
    'login',
    'band',
    'ui.router',
    'underscore',
    'moment',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'common/views/frame.html',
        controller: 'MainController as MController'
        })
      .state('main.home', {
        url: '/home',
        views: {
          'chewy': {
            templateUrl: 'common/views/homepage.html',
            controller: 'MainController as MController'
          }
        }
      })
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

      .state('main.bandupdate', {
        url: '/updateband/:bandId',
        views: {
          'chewy': {
            templateUrl: 'band/views/updateBand.html',
            controller: 'DetailController as DController'
          }
        }
      })

      .state('404', {
        url: '/404',
        templateUrl: 'common/views/404.html'
      });

      $urlRouterProvider.otherwise('/main/home');
  });

angular
  .module('underscore', [])
  .factory('_', function ($window) {
    return $window._;
  });
angular
  .module('moment', [])
  .factory('moment', function ($window) {
    return $window.moment;
  });




}());
