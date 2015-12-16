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
              if (currVal.phone === null) {
                currVal.phone = "no phone number available";
              }
              if (currVal.capacity === null) {
                currVal.capacity = "no capacity data available";
              }
              if (currVal.website === null) {
                currVal.website = "/#/404";
              }
            });
            vm.venues = venues;
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

        var currMonth = function () {
          var date = new Date();
          var year = date.getYear();
          var month = date.getMonth();
          var date = new Date(year, month, 1);
          var days = [];
          while (date.getMonth() === month) {
            var day = {};
            day.long = new Date(date);
            day.short = moment(day.long).format('Do');
            days.push(day);
            date.setDate(date.getDate() + 1);
          }
            vm.days = days;
            console.log(days);
        };

        currMonth();

    });



}());
