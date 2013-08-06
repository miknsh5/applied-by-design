'use strict';

angular.module('appliedByDesignApp')
  .factory('reportBuilder', function (fleetModel, navService, financialReports) {
    // Service logic

    // calculated data (watch these with return functions)
    var routeReport;

    // Public API here
    return {
      getReport: function(name){
        return eval(name);
      },
      getRouteNameFromId: function(id){
        return routeReport[id].NonDirectional;
      },
      // Get Financial Report for some subset of the total fleet/routes
      buildFinancialReport: function(forecast) {
        
        // Retrieve data dependencies
        var revFlights   = fleetModel.getData('flights');
        var airplanes    = fleetModel.getData('airplanes');
        var market       = fleetModel.getData('market');
        var services     = fleetModel.getData('services');
        var costCurves   = fleetModel.getData('costCurves');
        var equipment    = navService.getEquipment();

        // Get routes list
        var activeRoutes = this.allRoutes();

        // Instantiate report variables
        var startYear    = 2013;
        var weeks = 52;
        var totalRev, outputCost, outputOps, years, APCount, studyyear;
        var cap, coeffs, rpm, fuelprice, servicesInUse;
        var outputReport = [];
        var airplaneReport = [];
        var reportArray = [];
        var outputReport = [];
        var flightReport = {};

        // If user wants forecasted years...
        if(forecast) {
          years = market.forecast.years;
        }
        else {
          years = 1;
        }

        // For each year...
        for(var y = 0; y<years; y++) {
          totalRev = 0;
          outputCost = {};
          outputOps = {'RPM':0,'ASK':0,'PAX':0,'Seats':0,'Weeky Freq.':0};
          studyyear = startYear + y;

          // Calculate frequency, capacity, load factor, fare and total revenue for each flight
          for(var i = 0;i<revFlights.length;i++) {

            // Calculate financial and performance perameters
            flightReport.freq     = revFlights[i].Frequency;
            cap                   = _.findWhere(airplanes,{Equipment:revFlights[i].Equipment}).Capacity;
            flightReport.lf       = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).LF*Math.pow(1+market.growth.demand,y);
            flightReport.pax      = flightReport.lf*cap;
            flightReport.bt       = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Duration;
            flightReport.stagelen = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Distance;
            coeffs                = jQuery.extend(true, {}, _.findWhere(costCurves, {Size:_.findWhere(airplanes,{Equipment: revFlights[i].Equipment}).Size}).Coefficients);
            rpm                   = flightReport.pax*flightReport.stagelen;
            servicesInUse         = _.findWhere(equipment,{code:revFlights[i].Equipment}).services;
            fuelprice             = market.rates.fuel*Math.pow(1+market.growth.fuel,y);
            flightReport.fare     = (market.rates.Coefficients.Revenue.A*Math.pow(flightReport.stagelen,2)+market.rates.Coefficients.Revenue.B*flightReport.stagelen+market.rates.Coefficients.Revenue.C)*Math.pow(1+market.growth.fare,y);
            flightReport.Revenue  = weeks*flightReport.freq*flightReport.pax*flightReport.fare;

            // Store flight, route and equipment information
            flightReport.Flight = revFlights[i].FltNumber;
            flightReport.Equipment=revFlights[i].Equipment;
            flightReport.NonDirectional = revFlights[i].NonDirectional;

            // Store origin and destination information
            flightReport.oCity = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Ocity;
            flightReport.oState = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Ostate;
            flightReport.oCountry = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Ocountry;
            flightReport.oName = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Oname;
            flightReport.dCity = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Dcity;
            flightReport.dState = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Dstate;
            flightReport.dCountry = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Dcountry;
            flightReport.oIata = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Oiata;
            flightReport.dIata = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Diata;
            flightReport.dName = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Dname;
            flightReport.Distance = _.findWhere(activeRoutes,{NonDirectional:revFlights[i].NonDirectional}).Distance;

            // Store schedule information
            flightReport.monday    = +revFlights[i].Monday;
            flightReport.tuesday   = +revFlights[i].Tuesday;
            flightReport.wednesday = +revFlights[i].Wednesday;
            flightReport.thursday  = +revFlights[i].Thursday;
            flightReport.friday    = +revFlights[i].Friday;
            flightReport.saturday  = +revFlights[i].Saturday;
            flightReport.sunday    = +revFlights[i].Sunday;

            // Apply services
            for(var n=0;n<servicesInUse.length;n++) {
              var k1 = servicesInUse[n].name;
              if(servicesInUse[n].val) {
                for(var k2 in services[k1]) {
                  for(var c1 in services[k1][k2]) {
                    coeffs[k2][c1] = coeffs[k2][c1]*services[k1][k2][c1];  
                  }
                }
              }
            }

            // Calculate total annual flight costs
            var totalCost = 0;

            for(var k in coeffs) {
              if(outputCost[k]===undefined) {
                outputCost[k] = 0;
              }
              if(k=='Fuel') {
                flightReport[k] = weeks*flightReport.freq*(coeffs[k].A*Math.pow(rpm,2) + coeffs[k].B*rpm + coeffs[k].C)*fuelprice;
              }
              else {
                flightReport[k] = (weeks*flightReport.freq*(coeffs[k].A*Math.pow(flightReport.bt,2)  + coeffs[k].B*flightReport.bt  + coeffs[k].C))*Math.pow(1+market.growth.costs,y);
              }
              totalCost = totalCost + flightReport[k];
            }

            // Save operational metrics
            flightReport.RPM = rpm*flightReport.freq*weeks;
            flightReport.Seats = cap*flightReport.freq*weeks;
            flightReport.ASK = cap*flightReport.freq*flightReport.stagelen*weeks;
            flightReport.PAX = flightReport.pax*flightReport.freq*weeks;
            flightReport.Freq = flightReport.freq*weeks;
            flightReport.Year = studyyear;

            // Save flight report and clear report variable
            reportArray[i] = flightReport;
            flightReport = {};
          }

          // Save year report and clear report variable
          outputReport[y] = {'fleetReport':jQuery.extend(true, {}, reportArray)};
          reportArray = [];
        }

        // Store and return financial report
        financialReports.setReport(outputReport);
        return outputReport;

      },
      generateEquipment: function() {

        // retrieve data dependencies
        var flights     = fleetModel.getData('flights');
        var airplanes   = fleetModel.getData('airplanes');

        //Get all of the unique equipment codes from flights
        var equipCodes = _.uniq(_.pluck(flights,'Equipment'));
        var equipment = [];
        var APservices;

        //Assign equipment names to 'equipment'
        for(var i = 0;i<equipCodes.length;i++)
        {
          equipment[i] = {
            'name': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Name,
            'code':equipCodes[i],
            'active': true
           };

           equipment[i].services = [];
           equipment[i].details = {};

          equipment[i].details = [ {  'name':'Aircraft Name','value': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Name},
                                   {  'name':'OAG Code','value': equipCodes[i]},
                                   {  'name':'Count','value': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Count},
                                   {  'name':'Capacity','value': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Capacity},
                                   {  'name':'Cabins','value': _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Cabins}];

          APservices = _.find(airplanes, function(num){ return num.Equipment == equipCodes[i];}).Services;

          for(var k in APservices)
          {
            equipment[i].services.push({'name':k,'val':APservices[k]});
          }

        }

        //set initial equipment object in navService
        navService.initializeEquipment(equipment);
        return equipment;
      },
      findArray: function(inputArray,searchCrit,key){

        var critReturn = [];
        for(var crit=0;crit<searchCrit.length;crit++)
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
      allRoutes: function(){
        // retrieve data dependencies
        var cityPairs  = fleetModel.getData('cityPairs');
        var airports   = fleetModel.getData('airports');
        var revFlights = fleetModel.getData('flights');
        var equipment  = navService.getEquipment();

        var allRoutes = [];
        var report    = [];

        // check to make sure all required data is available
        if (typeof(cityPairs) == 'undefined') { console.log('cityPairs not defined'); return};
        if (typeof(airports) == 'undefined') { console.log('Airports not defined'); return};

        for(var i = 0;i<revFlights.length;i++) {
          allRoutes.push(revFlights[i].NonDirectional);
        }

        var uniqueRoutes = _.uniq(allRoutes);
        
        for(var k=0;k<uniqueRoutes.length;k++) {

          report[k] = {
            "NonDirectional": uniqueRoutes[k],
            "Fare": _.findWhere(cityPairs,{NonDirectional:uniqueRoutes[k]}).Fare,
            "Olat": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Latitude,
            "Oiata": uniqueRoutes[k].slice(0,3),
            "Diata": uniqueRoutes[k].slice(3,6),
            "Olon": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Longitude,
            "Ocity": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).City,
            "Oname": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Name,
            "Ostate": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).State,
            "Ocountry": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Country,
            "Dlat": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Latitude,
            "Dlon": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Longitude,
            "Dcity": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).City,
            "Dname": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Name,
            "Dstate": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).State,
            "Dcountry": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Country,
            "Distance":gcDistance(uniqueRoutes[k]),
            "Duration": _.findWhere(cityPairs, {NonDirectional:uniqueRoutes[k]}).Duration,
            "LF": _.findWhere(cityPairs, {NonDirectional: uniqueRoutes[k]}).LF};
        }
        
        return report;
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
              "Ocity": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).City,
              "Oname": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Name,
              "Ostate": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).State,
              "Ocountry": _.findWhere(airports, {Code:uniqueRoutes[k].slice(0,3)}).Country,
              "Dlat": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Latitude,
              "Dlon": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Longitude,
              "Dcity": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).City,
              "Dname": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Name,
              "Dstate": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).State,
              "Dcountry": _.findWhere(airports, {Code:uniqueRoutes[k].slice(3,6)}).Country,
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
