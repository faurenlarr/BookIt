(function() {
  'use strict';
  angular
    .module('band')
    .controller('BandController', function($scope, BandService) {
        var vm = this;




      vm.addband = function (newBand) {
                BandService.createband(newBand);
                // setTimeout(clearForm,25);
                alert('band added to profile');

              };

                      //
                      // var clearForm = function(){
                      //   vm.newBand.input="";
                      //   vm.newBand.location="";
                      //   vm.newBand.genre="";
                      //
                      // };


    });


}());
