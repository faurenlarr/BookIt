(function() {
  'use strict';
  angular
    .module('band')
    .factory('BandService', function($http, moment, _) {
      var createband = function(newBand) {
          var url = "/create-band";
          $http.post(url,newBand).then(function(res){
            console.log(res);
          });

      };

      return {
        createband: createband
      };
    });


}());

    
