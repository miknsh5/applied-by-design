'use strict';

angular.module('appliedByDesignApp')
  .factory('reportBuilder', function (fleetModel, navService, financialReports) {
    // Service logic

    // calculated data (watch these with return functions)
    var routeReport,
        financialReport    = [],
        operationsReport   = [];

    

    // Public API here
    return {
      getReport: function(name){
        return eval(name);
      },
      // Get Financial Report for some subset of the total fleet/routes
      buildFinancialReport: function(forecast, byAirplane, selRoutes) {
        
        // retrieve data dependencies
        var flights      = fleetModel.getData('flights');
        var airplanes    = fleetModel.getData('airplanes');
        var market       = fleetModel.getData('market');
        var services     = fleetModel.getData('services');
        var costCurves   = fleetModel.getData('costCurves');
        var equipment    = navService.getEquipment();

        // Filter flights by ODs if a filter is provided
        if (typeof(selRoutes) != 'undefined') {
          var flightsRoutes = this.findArray(flights, selRoutes,"OD");

        } 
        else {
          var flightsRoutes = flights;
        }

        var outputReport = [];

        // returns filtered set of routes as subset of fleetModel
        var filterBy     = _.pluck(_.where(equipment,{active:true}),'code');
        var revFlights;

        // Instantiate report variables
        var weeks = 52;
        var totalRev, outputCost, outputOps;
        var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
        var outputReport = [];
        var airplaneReport = [];
        var years, APCount;
        var TestObjMat = [];
        var TestObj = {};
        var TestMatrix = {"Flight":[],
                          "BT":[],
                          "freq":[],
                          "Duration":[],
                          "Fare":[],
                          "PAX":[],
                          "LF":[],
                          "Equipment":[],
                          "Revenue":[],
                          "Maintenance":[],
                          "Crew":[],
                          "Fuel":[],
                          "Ownership":[],
                          "Other":[]};

        //If User wants forecasted years...
        if(forecast) {
          years = market.forecast.years;
        }
        else {
          years = 1;
        }

        if (filterBy.length) { 

          // Instantiate report variables
          var weeks = 52;
          var totalRev, outputCost, outputOps;
          var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
          var fleetReport = [];
          var years, APCount;

          //If User wants forecasted years...
          if(forecast) {
            years = market.forecast.years;
          }
          else {
            years = 1;
          }

          //For Each Year...
          for(var y = 0; y<years; y++) {
            totalRev = 0;
            outputCost = {};
            outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};

            //If reporting by Airplane...
            if(byAirplane){
              APCount = filterBy.length;
            }
            else {
              APCount = 1;
            }

            //For Each Airplane...
            for(var aps=0;aps<APCount;aps++) {

              //If Reporting by Airplane
              if(byAirplane){
                revFlights = this.findArray(flightsRoutes, [filterBy[aps]],"Equipment");
              }
              else
              {
                revFlights = this.findArray(flightsRoutes, filterBy,"Equipment");
              }
            
              //Get Routes List
              var activeRoutes = this.buildRoutes();

              //Calculate frequency, capacity, load factor, fare and total revenue for each flight
              for(var i = 0;i<revFlights.length;i++) {
                //Calculate Financial and Performance Perameters
                freq           = revFlights[i].Frequency;
                cap            = _.findWhere(airplanes,{Equipment:revFlights[i].Equipment}).Capacity;
                lf             = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).LF*Math.pow(1+market.growth.demand,y);
                pax            = lf*cap;
                fare           = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Fare*Math.pow(1+market.growth.fare,y);
                bt             = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Duration;
                stagelen       = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Distance;
                coeffs         = jQuery.extend(true, {}, _.findWhere(costCurves, {Size:_.findWhere(airplanes,{Equipment: revFlights[i].Equipment}).Size}).Coefficients);

                rpm            = pax*stagelen;
                servicesInUse  = _.findWhere(airplanes,{Equipment:revFlights[i].Equipment}).Services;
                fuelprice      = market.rates.fuel*Math.pow(1+market.growth.fuel,y);

                ///TEST
                TestMatrix.Flight.push(revFlights[i].FltNumber);
                TestMatrix.BT.push(bt);
                TestMatrix.freq.push(freq);
                TestMatrix.Duration.push(stagelen);
                TestMatrix.Fare.push(fare);
                TestMatrix.PAX.push(pax);
                TestMatrix.LF.push(lf);
                TestMatrix.Equipment.push(revFlights[i].Equipment);

                TestObj = { "Flight":revFlights[i].FltNumber,
                            "BT":bt,
                            "freq":freq,
                            "Duration":stagelen,
                            "Fare":fare,
                            "PAX":pax,
                            "LF":lf,
                            "Equipment":revFlights[i].Equipment};

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

                //TEST
                TestMatrix.Revenue.push(weeks*freq*pax*fare);

                //Total Annual Flight Costs
                var totalCost = 0;

                for(var k in coeffs) {
                  if(outputCost[k]===undefined) {
                    outputCost[k] = 0;
                  }
                  if(k=="Fuel") {
                    outputCost[k] = outputCost[k] + weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
                    
                    //TEST
                    TestMatrix[k].push(weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice);
                    TestObj[k] = weeks*freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
                  }
                  else {
                    //Generic equation strucutre for all other costs
                    outputCost[k]   = outputCost[k] + (weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);

                    //TEST
                    TestMatrix[k].push((weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y));
                    TestObj[k] = (weeks*freq*(coeffs[k].A*Math.pow(bt,2)  + coeffs[k].B*bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);
                  }
                  totalCost = totalCost + outputCost[k];
                }

                //Operational Metrics
                outputOps["RPM"] = outputOps["RPM"]+rpm*freq;
                outputOps["Seats"] = outputOps["Seats"]+cap*freq;
                outputOps["ASK"] = outputOps["ASK"]+cap*freq*stagelen;
                outputOps["PAX"] = outputOps["PAX"]+pax*freq;
                outputOps["Weeky Freq."] = outputOps["Weeky Freq."]+freq;

                TestObjMat[i] = TestObj;
              }

              outputCost.Revenue  = totalRev;
              outputCost.Costs    = totalCost;
              outputCost.Profit   = totalRev - totalCost;
              outputCost.RPM      = outputOps.RPM;
              outputCost.Seats    = outputOps.Seats;
              outputCost.ASK      = outputOps.ASK;
              outputCost.PAX      = outputOps.PAX;
              outputCost.Freq     = outputOps["Weeky Freq."];

              // If Reporting by Airplane
              if(byAirplane) {
                outputCost.Equipment = filterBy[aps];
              }
              else {
                outputCost.Equipment = 'Total';
              }
                
              // Aggregate Airplane Reports
              fleetReport[aps] = jQuery.extend(true, {}, outputCost);
              outputCost = {};
              outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};
            }

            //Aggregate Years
            outputReport[y] = {'fleetReport':jQuery.extend(true, {}, fleetReport)};
          }
        }
        

        financialReport = jQuery.extend(true, {}, outputReport);

        financialReports.setReport(outputReport);

        return financialReport;

      },

      buildOperationsReport: function(forecast, byAirplane, selRoutes) {
        
        // retrieve data dependencies
        var flights      = fleetModel.getData('flights');
        var airplanes    = fleetModel.getData('airplanes');
        var market       = fleetModel.getData('market');
        var services     = fleetModel.getData('services');
        var costCurves   = fleetModel.getData('costCurves');
        var equipment    = navService.getEquipment();
        
        // Filter flights by ODs if a filter is provided
        if (typeof(selRoutes) != 'undefined') {
           var flightsRoutes = this.findArray(flights, selRoutes,"OD");
        } 
        else {
          var flightsRoutes = flights;
        }

        var outputReport = [];
        
        // return filtered set of routes as subset of fleetModel
        var filterBy = _.pluck(_.where(equipment,{active:true}),'code');
        var revFlights;
        
        // only generate route report if an aircraft type is selected
        if (filterBy.length) { 

          // Instantiate report variables
          var weeks = 52;
          var outputRev, outputCost, outputOps;
          var freq, cap, lf, pax, fare, stagelen, bt, coeffs, rpm, fuelprice, servicesInUse = [];
          var fleetReport = [];
          var years, APCount;

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

            //If reporting by Airplane...
            if(byAirplane)
            {
              APCount = filterBy.length;
            }
            else
            {
              APCount = 1;
            }

            //For Each Airplane...
            for(var aps=0;aps<APCount;aps++)
            {

              //If Reporting by Airplane
              if(byAirplane){
                revFlights = this.findArray(flightsRoutes, [filterBy[aps]],"Equipment");
              }
              else
              {
                revFlights = this.findArray(flightsRoutes, filterBy,"Equipment");
              }

              //Get Routes List
              var activeRoutes = this.buildRoutes();

              //Calculate frequency, capacity, load factor, fare and total revenue for each flight
              for(var i = 0;i<revFlights.length;i++) {
                //Calculate Financial and Performance Perameters
                freq           = revFlights[i].Frequency;
                cap            = _.findWhere(airplanes,{Equipment:revFlights[i].Equipment}).Capacity;
                lf             = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).LF*Math.pow(1+market.growth.demand,y);
                pax            = lf*cap;
                stagelen       = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Distance;
                rpm            = pax*stagelen;

                //Total Weekly Flight Operational Stats
                outputOps["RPM"] = outputOps["RPM"]+rpm*freq;
                outputOps["ASK"] = outputOps["ASK"]+cap*freq*stagelen;
                outputOps["PAX"] = outputOps["PAX"]+pax*freq;
                outputOps["Seats"] = outputOps["Seats"]+cap*freq;
                outputOps["Weeky Freq."] = outputOps["Weeky Freq."]+freq;

              }
              // If Reporting by Airplane
              if(byAirplane)
              {
                outputOps.Equipment = filterBy[aps];
              }
              else
              {
                outputOps.Equipment = 'Total';
              }
              
              // Aggregate Airplane Reports

              fleetReport[aps] = jQuery.extend(true, {}, outputOps);
              outputOps = {"RPM":0,"ASK":0,"PAX":0,"Seats":0,"Weeky Freq.":0};
              
            }
          outputReport[y] = {'fleetReport':jQuery.extend(true, {}, fleetReport)};
          }
        }

        operationsReport = jQuery.extend(true, {}, formatOperationsData(outputReport));

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
            'code':equipCodes[i],
            'active': true
           };
        }

        //set initial equipment object in navService
        navService.initializeEquipment(equipment);

      },
      findArray: function(inputArray,searchCrit,key){

        var critReturn = [];
        for(var crit in searchCrit)
        {
          critReturn = eval('_.where(inputArray,{'+key+':"'+searchCrit[crit]+'"})');

          if(crit==0)
          {
            var outputArray = critReturn;
          }
          else
          {
            for(var j in critReturn)
            {
              outputArray.push(critReturn[j]);
            }
          }
        }
        return outputArray;
      },
      clearReport: function(){
        routeReport = [];
      },
      addFlight: function(fltnum, origin, destination, equipment, DOW){

        var freq = 0;
        for(var i = 0;i<DOW.length;i++)
        {
          if(DOW[i])
          {
            freq++;
          }
        }

        var nonDirec;
        if(origin<destination)
        {
          nonDirec = origin+destination;
        }
        else
        {
          nonDirec = destination+origin;
        }

        var newFlight = { "FltNumber": fltnum,
                          "OD": origin+'-'+destination,
                          "NonDirectional": nonDirec,
                          "Depart": "00:00:00 AM",
                          "Arrive": "00:00:00 AM",
                          "Equipment": equipment,
                          "Stops": 0,
                          "Overnight": false,
                          "Partner": false,
                          "Monday": DOW[0],
                          "Tuesday": DOW[1],
                          "Wednesday": DOW[2],
                          "Thursday": DOW[3],
                          "Friday": DOW[4],
                          "Saturday": DOW[5],
                          "Sunday": DOW[6],
                          "Frequency": freq};

          return newFlight;
        
      },
      greatAirportRoutes: function(airport) {

        var airportRoutes = [];

        var activeRoutes = this.buildRoutes();

        for(var i=0;i<activeRoutes.length;i++)
        {
          if(activeRoutes[i].NonDirectional.slice(0,3)==airport || activeRoutes[i].NonDirectional.slice(3,6)==airport)
          {
            airportRoutes.push(activeRoutes[i])
          }
        }
        return airportRoutes;
      },
      greatCircle: function(origindestination) {
        return gcDistance(origindestination);
      },
      generateAirports: function() {
        return getUniqueAirports();
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
        var filterBy = _.pluck(_.where(equipment,{active:true}),'code');
      
        // only generate route report if an aircraft type is selected
        if (filterBy.length) { 
          var revFlights   = this.findArray(flights, filterBy,"Equipment");

          for(var i = 0;i<revFlights.length;i++) {
            allRoutes.push(revFlights[i].NonDirectional);
          }

          var uniqueRoutes = _.uniq(allRoutes);
          
          for(var k=0;k<uniqueRoutes.length;k++) {

            report[k] = {
              "NonDirectional": uniqueRoutes[k],
              "Fare": _.findWhere(cityPairs,{NonDirectional:uniqueRoutes[k]}).Fare,
              "Olat": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Latitude,
              "Olon": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Longitude,
              "Dlat": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Latitude,
              "Dlon": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Longitude,
              "Distance":gcDistance(uniqueRoutes[k]),
              "Duration": _.findWhere(cityPairs, {NonDirectional:uniqueRoutes[k]}).Duration,
              "LF": _.findWhere(cityPairs, {NonDirectional: uniqueRoutes[k]}).LF};
          }
        }
        
        routeReport = report;
        return report;
      }

    };

    //CURRENTLY NOT IN USE
    function getUniqueAirports(){

      var flights = fleetModel.getData('flights');
      var airports = fleetModel.getData('airports');

      //Define Unique Routes
      var allRoutes = [];
      for(var i = 0;i<flights.length;i++)
      {
        allRoutes.push(flights[i].NonDirectional);
      }

      var uniqueRoutes = _.uniq(allRoutes);

      //Define Unique Airports
      var allAirports = [];
      for(var i = 0;i<uniqueRoutes.length;i++)
      {
        allAirports.push(uniqueRoutes[i].slice(0,3));
        allAirports.push(uniqueRoutes[i].slice(3,6));
      }

      var uniqueAirports = _.uniq(allAirports);

      //Gather Information for Each Unique Airport
      var airportReport = [];      
      for(var k=0;k<uniqueAirports.length;k++)
      {
        airportReport[k] = {"Code": uniqueAirports[k],
                            "Latitide":  _.findWhere(airports, {Code: uniqueAirports[k]}).Latitude,
                            "Longitude": _.findWhere(airports, {Code: uniqueAirports[k]}).Longitude}
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
