'use strict';

angular.module('appliedByDesignApp')
  .factory('routeService', function (financialReports) {
    // Service logic


    var obj = {};
    obj.routes          = [];
    obj.activeRoute     = [];
    obj.activeRouteName = 'ORDSEA';
    obj.frequencies     = [
        {'name': 'MON', 'active': false, 'numFlights': 4},
        {'name': 'TUE', 'active': false, 'numFlights': 2},
        {'name': 'WED', 'active': false, 'numFlights': 8},
        {'name': 'THU', 'active': false, 'numFlights': 0},
        {'name': 'FRI', 'active': false, 'numFlights': 3},
        {'name': 'SAT', 'active': false, 'numFlights': 0},
        {'name': 'SUN', 'active': false, 'numFlights': 10}
      ];

    obj.setActiveDay = function(id){
      obj.frequencies.forEach(function(day, key){
        day.active = (key === id) ? true : false;
      });
      return obj.frequencies;
    }

    obj.runRouteReport = function(){
      // obj.activeRouteName = routeName;
      obj.activeRoute = financialReports.getRouteReport(obj.activeRouteName);
      
      // update flight frequencies
      obj.activeRoute[0].detail.route.freq.days.forEach(function(nFlts, key){
        obj.frequencies[key].numFlights = nFlts;
      })

    }
    return obj;

    // // Public API here
    // return {
    //   // getDays: function(){
    //     // return frequencies;
    //   // },
    //   getActiveRouteReport: function(){
    //     return activeRouteReport;
    //   },
    //   getActiveRouteName: function(){
    //     return activeRouteName;
    //   },


    //   setRouteReport: function(routeName){

    //     //update local routeName variable on service object
    //     activeRouteName = routeName;

    //     //filter routeReport to just the selected route object
    //     activeRouteReport = financialReports.getRouteReport(routeName);

    //     // update the flight frequency object
    //     angular.forEach(activeRouteReport[0].detail.route.freq.days, function(nFlts, key){
    //       frequencies[key].numFlights = nFlts;
    //     });

    //     return activeRouteReport;
    //   },
    //   setActiveDay: function(id){
    //     angular.forEach(frequencies, function(day, key){
    //       day.active = (key === id) ? true : false;
    //     });
    //     return frequencies;
    //   },
    //   setActiveRouteName: function(name){
    //     activeRouteName = name;
    //   },

    // };
  });
