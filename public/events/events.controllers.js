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

        vm.search = function(location) {
          var param = location.city + ',' + location.state;
          EventsService.getVenues(param).success(function(venues) {
            _.each(venues, function(currVal,idx,arr) {
              if (currVal.description === "") {
                currVal.description = "no description available";
              }
            });
            vm.venues = venues;
            console.log(venues);
            vm.showForm = false;
            vm.nothaCity = true;
          });
        };

        vm.newCity = function() {
          vm.showForm = true;
          vm.nothaCity = false;
          vm.venues = [];
        };

        vm.showDetails = function() {
          vm.details = true;
        };

    });
}());
