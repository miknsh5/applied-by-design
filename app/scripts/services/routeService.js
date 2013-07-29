'use strict';

angular.module('appliedByDesignApp')
  .factory('routeService', function (financialReports) {
    // Service logic

    var routeReport = [];
    var frequencies = [
        {'name': 'MON', 'active': true, 'numFlights': 4},
        {'name': 'TUE', 'active': true, 'numFlights': 2},
        {'name': 'WED', 'active': true, 'numFlights': 8},
        {'name': 'THU', 'active': true, 'numFlights': 0},
        {'name': 'FRI', 'active': true, 'numFlights': 3},
        {'name': 'SAT', 'active': true, 'numFlights': 0},
        {'name': 'SUN', 'active': true, 'numFlights': 10}
      ];


    // Public API here
    return {
      getDays: function(){
        return frequencies;
      },
      getRouteReport: function(routeName){
        return routeReport;
      },


      setRouteReport: function(routeName){
        routeReport = financialReports.getRouteReport(routeName);
        return routeReport;
      },
      setActiveDay: function(id){
        angular.forEach(frequencies, function(day, key){
          day.active = (key == id) ? true : false;
        });
        return frequencies;
      },
      isDayActive: function(id) {
        return frequencies[id].active;
      }
    };
  });
