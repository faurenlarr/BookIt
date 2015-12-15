(function() {
  'use strict';
  angular
  .module('events')
    .controller('EventsController', function(
      $state,
      $stateParams,
      EventsService) {

        var vm = this;

        var tester = function() {
          console.log("EventsController");
        };

        tester();

    });
}());
