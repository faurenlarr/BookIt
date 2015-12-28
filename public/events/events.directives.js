(function() {
  'use strict';
  angular
  .module('events')
    .directive('venueBlock', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/venueBlock.html',
        link: function(scope,el,attr) {

        },
        controller: function($scope, $state, $stateParams, EventsService) {

          $scope.details = false;

          $scope.showDetails = function() {
            if ($scope.details === false) {
              $scope.details = true;
            } else if ($scope.details === true) {
              $scope.details = false;
            }
          };

          $scope.viewSchedule = function(venue) {
            var id = venue.id;
            var bandId = $stateParams.bandId;
            var name = venue.displayName;
            $state.go('^.showcalendar',{venueId: id, bandId: bandId, venueName: name});
          };

        }
      };
    })
    .directive('calendar', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/calendar.html',
        controller: function(EventsService, $scope, $stateParams) {

          var formatMonth = function(shows, days) {

            // time stamp to check for the current day
            var now = new Date();
            // assign shows to days that match the date
            for (var i = 0; i < shows.length; i++) {
              for (var j in days) {
                // check if the day has a show
                if (days[j].standard.includes(shows[i].start.date)) {
                  days[j].show = shows[i];
                  days[j].available = false;
                } else if (days[j].long <= now.getDate()) {
                  days[j].available = false;
                }
                // assign an id to the first of the month
                // to shift the block over to the right
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
              } //end of j loop
            } // end of i loop
          };

          var setDays = function (date, month) {
            var days = [];
            while (date.getMonth() === month) {
              var day = {};
              day.long = new Date(date);
              day.med = moment(day.long).format('MMM Do YYYY');
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
              $scope.shows = shows;
              formatMonth(shows, days);
            });
              $scope.month = days[0].month;
              $scope.venueName = $stateParams.venueName;
              $scope.days = days;
              console.log($scope.date);

          };

          $scope.currMonth = function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            $scope.date = new Date(year, month, 1);
            setDays($scope.date, month);
          };

          $scope.nextMonth = function() {
            var m = $scope.date.getMonth();
            setDays($scope.date, m);
          };

          $scope.prevMonth = function() {
            var m = $scope.date.getMonth();
            if (m === 0) {
              var year = $scope.date.getFullYear() - 1;
              $scope.date.setFullYear(year);
              m = 10;
            } else {
              m -= 2;
            }
            $scope.date.setMonth(m, 1);
            setDays($scope.date, m);
          };

        } //end of controller
      };
    })
    .directive('dayBlock', function() {
      return {
        restrict: 'E',
        templateUrl: 'events/views/dayBlock.html',
        transclude: true,
        controller: function($scope, EventsService, MainService, $stateParams) {
          $scope.check = function(day) {
            $scope.day = day;
          };

          $scope.book = function (day) {
            var venId = $stateParams.venueId;
            EventsService.getVenDetails(venId).then(function(details) {
              console.log(details);
              // var gig = {
              //   date: day.med,
              //   venueName: $stateParams.venueName,
              //   venueAddress: ,
              //   venuePhoneNum: ,
              //   venueWebsite: ,
              //   venueLong: ,
              //   venueLat: ,
              //   isConfirmed: false
              // };
              var bandId = $stateParams.bandId;
              // EventsService.addEvent(bandId, gig).success(function(gig) {
              //   $scope.booked = true;
              // });
           });

          };

          //paywall
          $scope.paywall = 1;
          $scope.setPaywall = function(item){
            $scope.paywall = item;
          };
          $scope.isPaywall = function(item, day){
            if(item === $scope.paywall){
              return true;
            }else{
              return false;
            }
          };

        },
        link: function(scope,el,attr) {

        }
      };
    });
}());
