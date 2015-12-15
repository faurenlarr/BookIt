(function() {
  'use strict';
  angular
  .module('bookit', [
    'login',
    'band',
    'events',
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


      .state('main.editaccount', {
        url: '/editaccount/:userId',
        views: {
          'chewy': {
            templateUrl: 'login/views/editAccount.html',
            controller: 'EditAccountController as EAController'
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
