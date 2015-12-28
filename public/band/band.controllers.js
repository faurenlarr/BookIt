(function() {
  'use strict';
  angular
    .module('band')
    .controller('BandController', function(
      $scope,
      $stateParams,
      BandService,
      $state,
      $location,
      MainService
    ) {

      var vm = this;

      vm.addband = function (newBand) {
                BandService.createband(newBand).success(function() {
                  vm.newBandAlert = true;
                  // clear form not working
                  vm.name = "";
                  vm.city = "";
                  vm.genre = "";

                BandService.getUser().success(function(user){  //redirect to band page after making new band
                  var id = user.id;
                    MainService.getBands(id).success(function(bands){
                      var i = bands.length - 1;
                      var bandId = bands[i].id;
                      $state.go('^.band', {bandId: bandId});
                    });
                  });


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

      vm.goBookShow = function(band) {        //redirect to book show page from sidepanel dropdown
        var id = band.id;
        $state.go('^.show',{bandId: id});
      };

      vm.goEdit = function(band) {
        var id = $stateParams.bandId;
        $state.go('^.updateband',{bandId: id});
      };

      var getUpcomingShows = function() {
        var bandId = $stateParams.bandId;
        BandService.getNextShows(bandId).success(function(shows) {
          vm.shows = shows;
        });
      };

      getUpcomingShows();

      

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
