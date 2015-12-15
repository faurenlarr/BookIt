(function() {
  'use strict';
  angular
    .module('band')
    .factory('BandService', function($http, moment, _) {

      var createband = function(newBand) {
          var url = "/create-band";
          return $http.post(url,newBand);
      };

      var getDetails = function(id) {
        var url = '/get-band/'+id;
        return $http.get(url);
      };

      var removeBand = function(band){
        var url = "/get-bands/1";
        $http.delete(url+'/'+band._id); //create function here, pass in below, call deleteFaces in controllers
              };

      //   var sidebarslide = function(){
      // $('.sidebar').css('transform', 'rotate(20deg)');
      // $('.gotoplaces').css('transition', 'all .5s ease-in-out');

      var updateBand = function(band) {
        var id = band.id;
        var url = '/edit-band/' + id;
        return $http.put(url, band);
      };

      var getUser = function() {
        var url = '/get-user';
        return $http.get(url);
      };

      return {
        createband: createband,
        getDetails: getDetails,
        deleteBand: removeBand,
        updateBand: updateBand,
        getUser: getUser
      };
    });


}());
