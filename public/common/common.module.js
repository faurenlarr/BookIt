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
      .state('home', {
        url: '/home',
        templateUrl: 'common/views/frame.html',
        controller: 'MainController as MController'
        })
      .state('home.sidepanel', {
        url: '/sidepanel',
        views: {
          'side': {
            templateUrl: 'common/views/sidePanel.html'
          }
        }
      })
      .state('404', {
        url: '/404',
        templateUrl: 'common/views/404.html'
      });

      $urlRouterProvider.otherwise('/home');
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
