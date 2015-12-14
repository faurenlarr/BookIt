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
                BandService.createband(newBand).success(function() {
                  alert("Band added")
                });

              };


      vm.removeBand = function(band){
          BandService.deleteBand(band);
      };

      vm.bandDetails = function(band) {
        var id = band.id;
        $location.url('/main/band/' + band.id);
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
        });
      };

      deets();

      vm.editName = function(e) {
        event.preventDefault();
        console.log("editName()");
      };

      vm.updateBand = function(editedBand) {
        var id = $stateParams.bandId;
        BandService.getDetails(id).success(function(band) {
          editedBand.id = band.id;
          console.log(editedBand);
          BandService.updateBand(editedBand).success(function(data) {
            console.log(data);
            //$state.go('main.bandupdate');
          });
        });
      };


    });


}());
