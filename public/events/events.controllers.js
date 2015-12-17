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
            console.log(venues);
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
          var year = date.getFullYear();
          var month = date.getMonth();
          var date = new Date(year, month, 1);
          var days = [];
          while (date.getMonth() === month) {
            var day = {};
            day.long = new Date(date);
            day.med = moment(day.long).format('MMM Do');
            day.short = moment(day.long).format('Do');
            day.ofWeek = moment(day.long).format('D');
            day.standard = moment(day.long).format();
            days.push(day);
            date.setDate(date.getDate() + 1);
          }
          var id = $stateParams.venueId;
          EventsService.getCalendar(id).success(function(shows){
            var shows = shows;
              for (var i = 0; i < shows.length; i++) {
                for (var j in days) {
                  if (days[j].standard.includes(shows[i].start.date)) {
                    days[j].show = shows[i];
                  }
                  if (days[j].ofWeek === '1') {
                    days[j].DOMid = 'first';
                  }
                }
              }
          });
            vm.days = days;
        };

        currMonth();
        

    });



}());
