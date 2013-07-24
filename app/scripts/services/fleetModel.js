'use strict';

angular.module('appliedByDesignApp')
  .factory('fleetModel', function ($http, byKeyFilter, findByKeyFilter, findAirportFilter, findSizeFilter, findRouteFilter, byRouteFilter, findFleetTypeFilter, byFleetTypeFilter, activeEquipmentFilter) {
    // Service logic

   var fleetModel;
    var airplanes, citypairs, flights, costcurves, market, services, airports;

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
          $http({method: 'GET', url: 'images/airports.json'})
            .success(function(data){
                airports = data;
                console.log('services data model loaded')
              })
            .error(function(data){
                console.log('Resolve Error: airports data not loaded!');
              });
      }(),
      getFilteredData: function() {
        // returns filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
        return byKeyFilter(fleetModel, filterBy,"Equipment");

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
        var revFlights   = byKeyFilter(flightsRoutes, filterBy,"Equipment");

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

          //Get Routes List
          var activeRoutes = defineRoutes();

          //Calculate frequency, capacity, load factor, fare and total revenue for each flight
          for(var i = 0;i<revFlights.length;i++)
          {
            //Calculate Financial and Performance Perameters
            freq           = revFlights[i].Frequency;
            cap            = findByKeyFilter(airplanes, [revFlights[i].Equipment],"Equipment").Capacity;
            lf             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").LF*Math.pow(1+market.growth.demand,y);
            pax            = lf*cap;
            fare           = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Fare*Math.pow(1+market.growth.fare,y);
            bt             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Duration;
            stagelen       = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Distance;
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
              //For first loop, instantiate costs
              if(outputCost[k]===undefined)
              {
                outputCost[k] = 0;
              }

              //Special equation structure for fuel costs
              if(k=="Fuel")
              {
                outputCost[k] = outputCost[k] + weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
              }

              //Generic equation strucutre for all other costs
              outputCost[k]   = outputCost[k] + (weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);
            }
          }

        outputReport[y] = {"Revenue":outputRev,"Costs":outputCost,"Ops":outputOps};
        }
        
        return outputReport;

      },
      getEquipment: function() {
        return airplanes;
      },
      getRoutes: function() 
      {
        return defineRoutes()
      },
      getAirports: function() 
      {
        return defineAirports()
      },
      toggleEquipment: function(id){
        equipment[id].active = !equipment[id].active;
      },
      isEquipActive: function(id, test) {
        return equipment[id].active;
      }
    };

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

    function defineRoutes()
    {
      var allRoutes = [];
      for(var i = 0;i<flights.length;i++)
      {
        allRoutes.push(flights[i].NonDirectional);
      }

      var uniqueRoutes = uniqueSet(allRoutes);
      var routeReport = [];
      
      for(var k=0;k<uniqueRoutes.length;k++)
      {
        routeReport[k] = {"NonDirectional": uniqueRoutes[k],
                          "Fare": findByKeyFilter(citypairs, [uniqueRoutes[k]],"NonDirectional").Fare,
                          "Olat": findByKeyFilter(airports, [uniqueRoutes[0].slice(0,3)],"Code").Latitude,
                          "Olon": findByKeyFilter(airports, [uniqueRoutes[0].slice(0,3)],"Code").Longitude,
                          "Dlat": findByKeyFilter(airports, [uniqueRoutes[0].slice(3,6)],"Code").Latitude,
                          "Dlon": findByKeyFilter(airports, [uniqueRoutes[0].slice(3,6)],"Code").Longitude,
                          "Distance": findByKeyFilter(citypairs, [uniqueRoutes[k]],"NonDirectional").Distance,
                          "Duration": findByKeyFilter(citypairs, [uniqueRoutes[k]],"NonDirectional").Duration,
                          "LF": findByKeyFilter(citypairs, [uniqueRoutes[k]],"NonDirectional").LF};
      }
      return routeReport;
    }
    function defineAirports()
    {

      //Define Unique Routes
      var allRoutes = [];
      for(var i = 0;i<flights.length;i++)
      {
        allRoutes.push(flights[i].NonDirectional);
      }
      var uniqueRoutes = uniqueSet(allRoutes);

      //Define Unique Airports
      var allAirports = [];
      for(var i = 0;i<uniqueRoutes.length;i++)
      {
        allAirports.push(uniqueRoutes[i].slice(0,3));
        allAirports.push(uniqueRoutes[i].slice(3,6));
      }

      var uniqueAirports = uniqueSet(allAirports);

      //Gather Information for Each Unique Airport
      var airportReport = [];      
      for(var k=0;k<uniqueAirports.length;k++)
      {
        airportReport[k] = {"Code": uniqueAirports[k],
                            "Latitide": findByKeyFilter(airports, [uniqueAirports[k]],"Code").Latitude,
                            "Longitude": findByKeyFilter(airports, [uniqueAirports[k]],"Code").Longitude}
      }
      return airportReport;
    }
  });
