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
      




    };


  });
