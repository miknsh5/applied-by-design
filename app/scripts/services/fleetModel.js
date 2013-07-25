'use strict';

angular.module('appliedByDesignApp')
  .factory('fleetModel', function ($http) {
    // Service logic

    // external data being loaded in from JSON files
    var airplanes,
        cityPairs,
        flights,
        costCurves,
        market,
        services,
        airports;

    // Public API here
    return {
      // load external data source into service layer.  This should be instantiated on creation
      // of the service, and only need to be run once.  Should only need to call this if we decide
      // to load new data sources down the road (e.g. switch airlines, load multiple annual data sets, etc)
      getAirplanes: function() {
        $http({method: 'GET', url: 'images/airplanes.json'})
          .success(function(data){
              airplanes = data;
              console.log('airplanes data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: airplanes data not loaded!');
            });
      }(),
      getCityPairs: function() {
        $http({method: 'GET', url: 'images/cityPairs.json'})
          .success(function(data){
              cityPairs = data;
              console.log('city pairs data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: city pairs data not loaded!');
            });

      }(),
      getFlights: function() {
        $http({method: 'GET', url: 'images/flights.json'})
          .success(function(data){
              flights = data;
              console.log('flights data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: flights data not loaded!');
            });
      }(),
      getCostCurves: function() {
        $http({method: 'GET', url: 'images/costcurves.json'})
          .success(function(data){
              costCurves = data;
              console.log('cost curves data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: cost curves data not loaded!');
            });
      }(),
      getMarket: function() {
        $http({method: 'GET', url: 'images/market.json'})
          .success(function(data){
              market = data;
              console.log('market data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: market data not loaded!');
            });
      }(),
      getServices: function() {
        $http({method: 'GET', url: 'images/services.json'})
          .success(function(data){
              services = data;
              console.log('services data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: services data not loaded!');
            });
      }(),
      getAirports: function() {
        $http({method: 'GET', url: 'images/airports.json'})
          .success(function(data){
              airports = data;
              console.log('airports data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: airports data not loaded!');
            });

      }(),
      getData: function(name) {
        return eval(name);
      }
      // getOps: function(forecast, selRoutes) {
        
      //   // Filter flights by ODs if a filter is provided
      //   if (typeof(selRoutes) != 'undefined') {
      //      var flightsRoutes = byRouteFilter(flights, selRoutes);
      //   } 
      //   else {
      //     var flightsRoutes = flights;
      //   }

      //   // returns filtered set of routes as subset of fleetModel
      //   var filterBy     = activeEquipmentFilter(equipment);
      //   var revFlights   = byKeyFilter(flightsRoutes, filterBy,"Equipment");


      //   // Instantiate report variables
      //   var weeks = 52;
      //   var outputRev, outputCost, outputOps;
      //   var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
      //   var outputReport = [];
      //   var years;

      //   if(forecast) {
      //     years = market.forecast.years;
      //   }
      //   else {
      //     years = 1;
      //   }

      //   for(var y = 0; y<years; y++) {
      //     outputRev = 0;
      //     outputCost = {};
      //     outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};

      //     //Get Routes List
      //     var activeRoutes = buildRoutes();

      //     //Calculate frequency, capacity, load factor, fare and total revenue for each flight
      //     for(var i = 0;i<revFlights.length;i++) {
      //       //Calculate Financial and Performance Perameters
      //       freq           = revFlights[i].Frequency;
      //       cap            = findByKeyFilter(airplanes, [revFlights[i].Equipment],"Equipment").Capacity;
      //       lf             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").LF*Math.pow(1+market.growth.demand,y);
      //       pax            = lf*cap;
      //       stagelen       = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Distance;
      //       rpm            = pax*stagelen;

      //       //Total Weekly Flight Operational Stats
      //       outputOps["RPM"] = outputOps["RPM"]+rpm*freq;
      //       outputOps["ASK"] = outputOps["ASK"]+cap*freq*stagelen;
      //       outputOps["PAX"] = outputOps["PAX"]+pax*freq;
      //       outputOps["Seats"] = outputOps["Seats"]+cap*freq;
      //       outputOps["Weeky Freq."] = outputOps["Weeky Freq."]+freq;

      //     }

      //   outputCost.Revenue = outputRev;
      //   outputReport[y] = outputOps;
      //   }
        
      //   return outputReport;

      // },





    };


  });
