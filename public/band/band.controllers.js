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
                  vm.newBandAlert = true;
                  // clear form not working
                  vm.name = "";
                  vm.city = "";
                  vm.genre = "";
                });

              };

      vm.bandDetails = function(band) {
        var id = band.id;
        $location.url('/main/band/' + band.id);
      };

      vm.back = function() {
        $state.go('^.home');
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

      vm.goEdit = function(band) {
        var id = band.id;
        $state.go('^.updateband',{bandId: id});
      };

      vm.goBookShow = function(band) {
        var id = band.id;
        $state.go('^.show', {bandId: id})
      };

    })
    .controller('UpdateBandController', function($state, $stateParams, $http, BandService) {

      var vm = this;

      var bandForm = function(){
        var id = $stateParams.bandId;
          BandService.getDetails(id).success(function(band) {
            vm.editedBand = band;
            vm.button = true;
          });
      };

      bandForm();

      vm.updateBand = function(editedBand) {

        var id = $stateParams.bandId;

        BandService.getDetails(id).success(function(band) {
          editedBand.id = band.id;
          editedBand.pic = band.pic;
          BandService.getUser().success(function(user) {
            editedBand.user = user;
            BandService.updateBand(editedBand).success(function() {
              $state.go('^.band',{bandId: id});
            });
          });
        });
      };

      vm.removeBand = function(band) {
        BandService.removeBand(band).success(function() {
          $state.go('^.home');
        });
      };

      vm.delete = function() {
        vm.confirm = true;
        vm.button = false;
      };

      vm.cancel = function() {
        vm.confirm = false;
        vm.button = true;
      };

    });


}());
