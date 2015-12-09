(function() {
  'use strict';
  angular
  .module('bookit', [
    'login',
    'band',
    'ui.router',
    'underscore',
    'moment'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'common/views/frame.html',
        controller: 'MainController as MController'
        })
      .state('404', {
        url: '/404',
        templateUrl: 'common/views/404.html'
      })
      // .state('main', {
      //   url: '/',
      //   redirectTo: '/home'
      // })
      $urlRouterProvider.otherwise('/404');
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
