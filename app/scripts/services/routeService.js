'use strict';

angular.module('appliedByDesignApp')
  .factory('routeService', function (financialReports) {
    // Service logic

    var routeReport = [];
    var frequencies = [
        {'name': 'MON', 'active': false, 'numFlights': 4},
        {'name': 'TUE', 'active': false, 'numFlights': 2},
        {'name': 'WED', 'active': false, 'numFlights': 8},
        {'name': 'THU', 'active': false, 'numFlights': 0},
        {'name': 'FRI', 'active': false, 'numFlights': 3},
        {'name': 'SAT', 'active': false, 'numFlights': 0},
        {'name': 'SUN', 'active': false, 'numFlights': 10}
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
        // update the flight frequency object
        angular.forEach(routeReport[0].detail.route.freq.days, function(nFlts, key){
          frequencies[key].numFlights = nFlts;
        });
        
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
