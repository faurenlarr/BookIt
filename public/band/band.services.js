(function() {
  'use strict';
  angular
    .module('band')
    .factory('BandService', function($http, moment, _) {
      var createband = function() {
        var url = "/create-band";
 };

 return {
   createband: createband,

 };

    });


}());
