'use strict';

angular.module('appliedByDesignApp')
  .factory('fleetModel', function ($http, findSizeFilter, findRouteFilter, byRouteFilter, findFleetTypeFilter, byFleetTypeFilter, activeEquipmentFilter) {
    // Service logic

   var fleetModel;
    var airplanes, citypairs, flights, costcurves, market, services;

    // should be derived from fleetModel (eventually)
    var equipment = [
        {'name': '737-900',       'active': true},
        {'name': '737-800',       'active': true},
        {'name': '737-400',       'active': true},
        {'name': '737-400 Combi', 'active': true},
        {'name': '737-700',       'active': true}
      ];

    // Public API here
    return {
      getData: function() {
        // load external data source into service layer.  This should be instantiated on creation
        // of the service, and only need to be run once.  Should only need to call this if we decide
        // to load new data sources down the road (e.g. switch airlines, load multiple annual data sets, etc)
        //
        $http({method: 'GET', url: 'images/airplanes.json'})
          .success(function(data){
              airplanes = data;
              console.log('airplanes data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: airplanes data not loaded!');
            });

          $http({method: 'GET', url: 'images/citypairs.json'})
            .success(function(data){
                citypairs = data;
                console.log('city pairs data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: city pairs data not loaded!');
              });

          $http({method: 'GET', url: 'images/flights.json'})
            .success(function(data){
                flights = data;
                console.log('flights data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: flights data not loaded!');
              });

          $http({method: 'GET', url: 'images/costcurves.json'})
            .success(function(data){
                costcurves = data;
                console.log('cost curves data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: cost curves data not loaded!');
              });

          $http({method: 'GET', url: 'images/market.json'})
            .success(function(data){
                market = data;
                console.log('market data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: market data not loaded!');
              });
          $http({method: 'GET', url: 'images/services.json'})
            .success(function(data){
                services = data;
                console.log('services data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: services data not loaded!');
              });
      }(),
      getFilteredData: function() {
        // returns filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
        return byFleetTypeFilter(fleetModel, filterBy);

      },
      // Get Financial Report for some subset of the total fleet/routes
      getReport: function(forecast, selRoutes) {
        
        // Filter flights by ODs if a filter is provided
        if (typeof(selRoutes) != 'undefined') 
        {
           var flightsRoutes = byRouteFilter(flights, selRoutes);
        }
        else
        {
          var flightsRoutes = flights;
        }

        // returns filtered set of routes as subset of fleetModel
        var filterBy     = activeEquipmentFilter(equipment);
        var revFlights   = byFleetTypeFilter(flightsRoutes, filterBy);

        // Instantiate report variables
        var weeks = 52;
        var outputRev, outputCost, outputOps;
        var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
        var outputReport = [];
        var years;

        if(forecast)
        {
          years = market.forecast.years;
        }
        else
        {
          years = 1;
        }

        for(var y = 0; y<years; y++)
        {
          outputRev = 0;
          outputCost = {};
          outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};

          //Calculate frequency, capacity, load factor, fare and total revenue for each flight
          // for(var i = 0;i<revFlights.length;i++)
          // {
            var i = 0;
            //Calculate Financial and Performance Perameters
            freq           = revFlights[i].Frequency;
            cap            = findFleetTypeFilter(airplanes, [revFlights[i].Equipment]).Capacity;
            lf             = findRouteFilter(citypairs, [revFlights[i].OD]).LF*Math.pow(1+market.growth.demand,y);
            pax            = lf*cap;
            fare           = findRouteFilter(citypairs, [revFlights[i].OD]).Fare*Math.pow(1+market.growth.fare,y);
            bt             = findRouteFilter(citypairs, [revFlights[i].OD]).Duration;
            stagelen       = findRouteFilter(citypairs, [revFlights[i].OD]).Distance;
            coeffs         = jQuery.extend(true, {}, findSizeFilter(costcurves, [findFleetTypeFilter(airplanes, [revFlights[i].Equipment]).Size]).Coefficients);

            rpm            = pax*stagelen;
            servicesInUse  = findFleetTypeFilter(airplanes, [revFlights[i].Equipment]).Services;
            fuelprice      = market.rates.fuel*Math.pow(1+market.growth.fuel,y);

            //Apply Services
            for(var k1 in servicesInUse)
            {
              if(servicesInUse[k1])
              {
             for(var k2 in services[k1])
                 {
                  for(var c1 in services[k1][k2])
                  {
                coeffs[k2][c1] = coeffs[k2][c1]*services[k1][k2][c1];  
                  }
                 }
               }
            }

            //Total Annual Flight Revenue
            outputRev = outputRev + weeks*freq*pax*fare;

            //Total Weekly Flight Operational Stats
            outputOps["RPM"] = outputOps["RPM"]+rpm*freq;
            outputOps["ASK"] = outputOps["ASK"]+cap*freq;
            outputOps["PAX"] = outputOps["PAX"]+pax*freq;
            outputOps["Seats"] = outputOps["Seats"]+cap*freq;
            outputOps["Weeky Freq."] = outputOps["Weeky Freq."]+freq;

            //Total Annual Flight Costs
            for(var k in coeffs)
            {
              if(outputCost[k]===undefined)
              {
                outputCost[k] = 0;
              }
              if(k=="Fuel")
              {
                outputCost[k] = outputCost[k] + weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
              }

              outputCost[k]   = outputCost[k] + (weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);
            }
          // }

        outputReport[y] = {"Revenue":outputRev,"Costs":outputCost,"Ops":outputOps};
        }
        
        return outputReport;

      },
      getEquipment: function() {
        return airplanes;
      },
      ODs: function() 
      {
        function uniqueSet(fullSet)
        {
          var uniqueSet = [fullSet[0]];
          var isPresent;

          for (var i = 1; i < fullSet.length; i++)
          {

            if(!isUnique(uniqueSet,fullSet[i]))
            {
              uniqueSet.push(fullSet[i]);
            }
          }
          return uniqueSet;
        }

        function isUnique(a,val)
        {
          
          for (var u = 0; u < a.length; u++) 
          {
            if (a[u] === val) 
            {
              return true;
            }
          }
          return false;
        }

      },
      toggleEquipment: function(id){
        equipment[id].active = !equipment[id].active;
      },
      isEquipActive: function(id, test) {
        return equipment[id].active;
      }
    };
  });
