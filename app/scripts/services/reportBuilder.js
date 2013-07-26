'use strict';

angular.module('appliedByDesignApp')
  .factory('reportBuilder', function (fleetModel, navService, activeEquipmentFilter, byKeyFilter, findByKeyFilter, findFleetTypeFilter, findSizeFilter) {
    // Service logic

    // calculated data (watch these with return functions)
    var routeReport,
        financialReport    = [],
        performanceReport  = [],
        operationsReport   = [];

    var fleetReport

    // Public API here
    return {
      getReport: function(name){
        return eval(name);
      },
      // Get Financial Report for some subset of the total fleet/routes
      buildFinancialReport: function(forecast, selRoutes) {
        
        // retrieve data dependencies
        var flights      = fleetModel.getData('flights');
        var airplanes    = fleetModel.getData('airplanes');
        var market       = fleetModel.getData('market');
        var services     = fleetModel.getData('services');
        var costCurves   = fleetModel.getData('costCurves');
        var equipment    = navService.getEquipment();

        // Filter flights by ODs if a filter is provided
        if (typeof(selRoutes) != 'undefined') {
          var flightsRoutes = byRouteFilter(flights, selRoutes);
        } 
        else {
          var flightsRoutes = flights;
        }

        var outputReport = [];

        // return filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
        
        // only generate route report if an aircraft type is selected
        if (filterBy.length) { 
          var revFlights   = byKeyFilter(flightsRoutes, filterBy,"Equipment");


          // Instantiate report variables
          var weeks = 52;
          var totalRev, outputCost, outputOps;
          var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
          var years;

          if(forecast) {
            years = market.forecast.years;
          }
          else {
            years = 1;
          }

          for(var y = 0; y<years; y++) {
            totalRev = 0;
            outputCost = {};
            outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};

            //Get Routes List
            var activeRoutes = this.buildRoutes();

            //Calculate frequency, capacity, load factor, fare and total revenue for each flight
            for(var i = 0;i<revFlights.length;i++) {
              //Calculate Financial and Performance Perameters
              freq           = revFlights[i].Frequency;
              cap            = findByKeyFilter(airplanes, [revFlights[i].Equipment],"Equipment").Capacity;
              lf             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").LF*Math.pow(1+market.growth.demand,y);
              pax            = lf*cap;
              fare           = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Fare*Math.pow(1+market.growth.fare,y);
              bt             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Duration;
              stagelen       = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Distance;
              coeffs         = jQuery.extend(true, {}, findSizeFilter(costCurves, [findFleetTypeFilter(airplanes, [revFlights[i].Equipment]).Size]).Coefficients);

              rpm            = pax*stagelen;
              servicesInUse  = findFleetTypeFilter(airplanes, [revFlights[i].Equipment]).Services;
              fuelprice      = market.rates.fuel*Math.pow(1+market.growth.fuel,y);

              //Apply Services
              for(var k1 in servicesInUse) {
                if(servicesInUse[k1]) {
                  for(var k2 in services[k1]) {
                    for(var c1 in services[k1][k2]) {
                      coeffs[k2][c1] = coeffs[k2][c1]*services[k1][k2][c1];  
                    }
                  }
                }
              }

              //Total Annual Flight Revenue
              totalRev = totalRev + weeks*freq*pax*fare;

              //Total Annual Flight Costs
              var totalCost = 0;

              for(var k in coeffs) {
                if(outputCost[k]===undefined) {
                  outputCost[k] = 0;
                }
                if(k=="Fuel") {
                  outputCost[k] = outputCost[k] + weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
                }
                else {
                  //BEN - CHECK THIS
                  //Generic equation strucutre for all other costs
                  outputCost[k]   = outputCost[k] + (weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);
                }
                totalCost = totalCost + outputCost[k];

              }
            }
          outputCost.Revenue  = totalRev;
          outputCost.Costs    = totalCost;
          outputCost.Profit   = totalRev - totalCost;

          outputReport[y] = outputCost;

          }
        }
        
        financialReport = outputReport;
        return outputReport;

      },

      buildOperationsReport: function(forecast, selRoutes) {
        
        // retrieve data dependencies
        var flights      = fleetModel.getData('flights');
        var airplanes    = fleetModel.getData('airplanes');
        var market       = fleetModel.getData('market');
        var services     = fleetModel.getData('services');
        var costCurves   = fleetModel.getData('costCurves');
        var equipment    = navService.getEquipment();
        
        // Filter flights by ODs if a filter is provided
        if (typeof(selRoutes) != 'undefined') {
           var flightsRoutes = byRouteFilter(flights, selRoutes);
        } 
        else {
          var flightsRoutes = flights;
        }

        var outputReport = [];
        
        // return filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
        
        // only generate route report if an aircraft type is selected
        if (filterBy.length) { 
          var revFlights   = byKeyFilter(flightsRoutes, filterBy,"Equipment");


          // Instantiate report variables
          var weeks = 52;
          var outputRev, outputCost, outputOps;
          var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
          var years;

          if(forecast) {
            years = market.forecast.years;
          }
          else {
            years = 1;
          }

          for(var y = 0; y<years; y++) {
            outputRev = 0;
            outputCost = {};
            outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};

            //Get Routes List
            var activeRoutes = this.buildRoutes();

            //Calculate frequency, capacity, load factor, fare and total revenue for each flight
            for(var i = 0;i<revFlights.length;i++) {
              //Calculate Financial and Performance Perameters
              freq           = revFlights[i].Frequency;
              cap            = findByKeyFilter(airplanes, [revFlights[i].Equipment],"Equipment").Capacity;
              lf             = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").LF*Math.pow(1+market.growth.demand,y);
              pax            = lf*cap;
              stagelen       = findByKeyFilter(activeRoutes, [revFlights[i].NonDirectional],"NonDirectional").Distance;
              rpm            = pax*stagelen;

              //Total Weekly Flight Operational Stats
              outputOps["RPM"] = outputOps["RPM"]+rpm*freq;
              outputOps["ASK"] = outputOps["ASK"]+cap*freq*stagelen;
              outputOps["PAX"] = outputOps["PAX"]+pax*freq;
              outputOps["Seats"] = outputOps["Seats"]+cap*freq;
              outputOps["Weeky Freq."] = outputOps["Weeky Freq."]+freq;

            }

          outputReport[y] = outputOps;
          }
        }

        operationsReport = outputReport;
        return outputReport;

      },

      generateEquipment: function() {

        // retrieve data dependencies
        var flights     = fleetModel.getData('flights');
        var airplanes   = fleetModel.getData('airplanes');

        //Get all of the unique equipment codes from flights
        var equipCodes = _.uniq(_.pluck(flights,'Equipment'));
        var equipment = [];

        //Assign equipment names to 'equipment'
        for(var i = 0;i<equipCodes.length;i++)
        {
          equipment[i] = {
            'name': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Name,
            'active': true
           };
        }

        //set initial equipment object in navService
        navService.initializeEquipment(equipment);

      },
      clearReport: function(){
        routeReport = [];
      },
      greatCircle: function(origindestination) {
        return gcDistance(origindestination);
      },
      buildRoutes: function(){
        // retrieve data dependencies
        var cityPairs  = fleetModel.getData('cityPairs');
        var airports   = fleetModel.getData('airports');
        var flights    = fleetModel.getData('flights');
        var equipment  = navService.getEquipment();

        var allRoutes = [];
        var report    = [];

        // check to make sure all required data is available
        if (typeof(cityPairs) == 'undefined') { console.log('cityPairs not defined'); return};
        if (typeof(airports) == 'undefined') { console.log('Airports not defined'); return};

        

        // return filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
      
        // only generate route report if an aircraft type is selected
        if (filterBy.length) { 
          var revFlights   = byKeyFilter(flights, filterBy,"Equipment");

          for(var i = 0;i<revFlights.length;i++) {
            allRoutes.push(revFlights[i].NonDirectional);
          }

          var uniqueRoutes = uniqueSet(allRoutes);
          
          for(var k=0;k<uniqueRoutes.length;k++) {

            report[k] = {
              "NonDirectional": uniqueRoutes[k],
              "Fare": findByKeyFilter(cityPairs, [uniqueRoutes[k]],"NonDirectional").Fare,
              "Olat": findByKeyFilter(airports, [uniqueRoutes[k].slice(0,3)],"Code").Latitude,
              "Olon": findByKeyFilter(airports, [uniqueRoutes[k].slice(0,3)],"Code").Longitude,
              "Dlat": findByKeyFilter(airports, [uniqueRoutes[k].slice(3,6)],"Code").Latitude,
              "Dlon": findByKeyFilter(airports, [uniqueRoutes[k].slice(3,6)],"Code").Longitude,
              "Distance":gcDistance(uniqueRoutes[k]),
              "Duration": findByKeyFilter(cityPairs, [uniqueRoutes[k]],"NonDirectional").Duration,
              "LF": findByKeyFilter(cityPairs, [uniqueRoutes[k]],"NonDirectional").LF};
          }
        }
        
        routeReport = report;
        return report;
      }

    };





    function uniqueSet(fullSet){
      var uniqueSet = [fullSet[0]];
      var isPresent;

      for (var i = 1; i < fullSet.length; i++){
        if(!isUnique(uniqueSet,fullSet[i]))
        {
          uniqueSet.push(fullSet[i]);
        }
      }
      return uniqueSet;
    }

    function isUnique(a,val){      
      for (var u = 0; u < a.length; u++) {
        if (a[u] === val) {
          return true;
        }
      }
      return false;
    }

    function getUniqueAirports(){

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
    function gcDistance(origindestination){

       // retrieve data dependencies
      var airports   = fleetModel.getData('airports');

      var origin = origindestination.slice(0,3);
      var destin = origindestination.slice(3,6);

      var oLat = _.findWhere(airports,{Code:origin}).Latitude;
      var oLon = _.findWhere(airports,{Code:origin}).Longitude;
      var dLat = _.findWhere(airports,{Code:destin}).Latitude;
      var dLon = _.findWhere(airports,{Code:destin}).Longitude;

      var R = 3963.1676; // miles
      var lat1 = oLat* Math.PI / 180;
      var lon1 = oLon* Math.PI / 180;
      var lat2 = dLat* Math.PI / 180;
      var lon2 = dLon* Math.PI / 180;

      var theta = lon2 - lon1;
      var dist = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(theta));
      if (dist < 0)
        {
          dist = dist + Math.PI;
        }
      dist = dist*R;
      return dist;
    }





  });
