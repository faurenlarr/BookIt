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
        var formatMonth = function(shows, days) {
          for (var i = 0; i < shows.length; i++) {
            for (var j in days) {
              if (days[j].standard.includes(shows[i].start.date)) {
                days[j].show = shows[i];
              }
              if (days[j].short === '1st') {
                if (days[j].ofWeek === 'Sunday') {
                  days[j].DOMid = 'Sunday';
                } else if (days[j].ofWeek === 'Monday') {
                  days[j].DOMid = 'Monday'
                } else if (days[j].ofWeek === 'Tuesday') {
                  days[j].DOMid = 'Tuesday'
                } else if (days[j].ofWeek === 'Wednesday') {
                  days[j].DOMid = 'Wednesday'
                } else if (days[j].ofWeek === 'Thursday') {
                  days[j].DOMid = 'Thursday'
                } else if (days[j].ofWeek === 'Friday') {
                  days[j].DOMid = 'Friday'
                } else if (days[j].ofWeek === 'Saturday') {
                  days[j].DOMid = 'Saturday'
                }
              }
            }
          }
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
            day.day = moment(day.long).format('dddd');
            day.ofWeek = moment(day.long).format('dddd');
            day.month = moment(day.long).format('MMMM');
            day.monthNum = moment(day.long).format('M');
            day.standard = moment(day.long).format();
            days.push(day);
            date.setDate(date.getDate() + 1);
          }
          var id = $stateParams.venueId;
          EventsService.getCalendar(id).success(function(shows){
            vm.shows = shows;
            formatMonth(shows, days);
          });
            vm.month = days[0].month;
            vm.venueName = $stateParams.venueName;
            vm.days = days;
        };

        currMonth();
        vm.nexMonthShows = [];
        
        vm.nextMonth = function() {
          console.log("allshows: ", vm.shows);
          var date = new Date();
          var month = moment(date).format('M');
            var nextMonth = month + 1;
            if (nextMonth > 12) {
              nextMonth = 1;
            }
          console.log('next month: ', nextMonth);
          for (var i in vm.shows) {
            console.log('m: ',m);
            var m = moment(vm.shows[i].start.datetime).format('M');
            if (m === nextMonth) {
              nextMonthShows.push(vm.shows[i]);
            }
          }
          console.log('next month shows: ', nextMonthShows);
          // console.log(month);
          // console.log('shows: ',vm.shows);
          // var year = date.getFullYear();
          // var month = date.getMonth();
          // var date = new Date(year, month, 1);
          // var days = [];
          // while (date.getMonth() === month) {
          //   var day = {};
          //   day.long = new Date(date);
          //   day.med = moment(day.long).format('MMM Do');
          //   day.short = moment(day.long).format('Do');
          //   day.day = moment(day.long).format('dddd');
          //   day.ofWeek = moment(day.long).format('dddd');
          //   day.month = moment(day.long).format('MMMM');
          //   day.monthNum = moment(day.long).format('M');
          //   day.standard = moment(day.long).format();
          //   days.push(day);
          //   date.setDate(date.getDate() + 1);
          // }
        };


    });



}());
