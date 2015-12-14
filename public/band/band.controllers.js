(function() {
  'use strict';
  angular
    .module('band')
    .controller('BandController', function(
      $scope,
      $stateParams,
      BandService,
      $state,
      $location
    ) {

      var vm = this;




      vm.addband = function (newBand) {
                BandService.createband(newBand);
                // setTimeout(clearForm,25);
                alert('band added to profile');
              };


      vm.removeBand = function(band){
          BandService.deleteBand(band);
      };

      vm.bandDetails = function(band) {
        var id = band.id;
        $location.url('/band/' + band.id);
      };

    })
    .controller('DetailController', function(
      $scope,
      BandService,
      $state,
      $location,
      $stateParams
    ) {
      var vm = this;

      var deets = function() {
        var bandId = $stateParams.bandId;
        BandService.getDetails(bandId).success(function(band) {
          vm.band = band;
          console.log(band);
        });
      };

      deets();


    });


}());
