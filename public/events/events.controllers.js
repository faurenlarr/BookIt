(function() {
  'use strict';
  angular
  .module('events')
    .controller('EventsController', function(
      $scope,
      $state,
      $stateParams,
      EventsService) {

        var vm = this;

        vm.showForm = true;
        vm.dbClick = false;

        vm.newCity = function() {
          vm.showForm = true;
          vm.nothaCity = false;
          vm.venues = [];
        };

        vm.showDetails = function() {
          vm.details = true;
        };

        vm.search = function(location) {
          var bandId = $stateParams.bandId;
          var param = location.city + ',' + location.state;
          EventsService.getVenues(param).success(function(venues) {
            if (venues.length < 1) {
              $state.go('main.noVenues', {bandId: bandId});
            }
            _.each(venues, function(currVal,idx,arr) {
              if (currVal.description === "") {
                currVal.description = "no description available";
              }
              if (currVal.phone === null) {
                currVal.phone = "no phone number available";
              }
              if (currVal.capacity === null) {
                currVal.capacity = "no capacity data available";
              }
              if (currVal.website === null) {
                currVal.website = "/#/main/noWebsiteFound/"+bandId;
              }
            });
            vm.venues = venues;
            vm.showForm = false;
            vm.nothaCity = true;
          });

        };


    });



}());
