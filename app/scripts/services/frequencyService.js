'use strict';

angular.module('appliedByDesignApp')
  .factory('frequencyService', function () {
    // Service logic

    var frequencies = [
        {'name': 'MON', 'active': true},
        {'name': 'TUE', 'active': true},
        {'name': 'WED', 'active': true},
        {'name': 'THU', 'active': true},
        {'name': 'FRI', 'active': true},
        {'name': 'SAT', 'active': true},
        {'name': 'SUN', 'active': true}
      ];

    // Public API here
    return {
      getDaily: function() {
        return frequencies;
      },
      toggleDaily: function(id){
        frequencies[id].active = !frequencies[id].active;
      },
      isDayActive: function(id) {
        return frequencies[id].active;
      }
    };
  });
