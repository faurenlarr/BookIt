(function() {
  'use strict';
  angular
    .module('band')
    .controller('BandController', function($scope, BandService) {
        var vm = this;


        var clearForm = function(band){
          $scope.newBand.name="";
          $scope.newBand.location="";
          $scope.newBand.genre="";

        };


      vm.addband = function (newBand) {
                BandService.createband(newBand);
                setTimeout(clearForm,25);
                alert('band added to profile');

              };


    });


}());
