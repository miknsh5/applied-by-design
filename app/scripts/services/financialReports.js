'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .factory('financialReports', function (navService) {
    // Service logic

    var reports = {};
    reports.base    = [];
    reports.active  = [];
    // reports.fleet   = [];
    reports.npv     = [];
    // reports.revenue = {};

    var flightFinancials = {};
    flightFinancials.base   = [];
    flightFinancials.active = [];

    // var rebase = false; //set this flag to true when new base set of reports are needed

    reports.getReport = function(type){
      
      // make sure a report type was passed in
      if (!type) {
        console.log('!!! - no report type entered - specify "base" or "active"');
        return
      }

      return reports[type];
    };

    reports.getDeltaMetrics = function(){

      var metricsA = this.getFlightMetrics('active');
      var metrics0 = this.getFlightMetrics('base');
      var deltaMetrics = [];
      for (var i=0; i<metricsA.length; i++) {
        var delta = metricsA[i].val - metrics0[i].val;
        deltaMetrics.push({
            'name': metricsA[i].name,
            'val': delta,
            'isCurrency': metricsA[i].isCurrency,
            'isExpense': metricsA[i].isExpense,
            'decimals': metricsA[i].decimals
          });
      }
      return deltaMetrics;
    };

    reports.getFlightMetrics = function(type) {

      if (!type || !reports[type]) {
        console.log('!!! - whoops - invalid report type entered as argument');
        return
      }
      
      if (reports[type].length === 0 ) {
        console.log('---reports not created yet - please try again later---')
        return
      }

      var year        = navService.activeYear;
      var metricName  = navService.activeMetricName;
      var fleetId     = navService.activeFleetModel;

      return reports[type][year].perFlight[fleetId].metrics;
    }

    reports.getRouteReport = function(routeName){
      
      if (!routeName) {
        console.log('!!! - need to enter a routeName');
        return
      }

      return this.filterFinancialReport('active', routeName);
    };

    reports.getYears = function() {
      return _.pluck(reports.base, 'year');
    };


    reports.getNpv = function(discount,years) {
      var currentNPV  = runNpvReport(discount, years, reports.active);
      var baselineNPV = runNpvReport(discount, years, reports.base);

      // build npv report
      var deltaNpv = [];
      for(var n=0;n<currentNPV.length;n++) {
        deltaNpv[n] = {};
        deltaNpv[n] = { 'name': currentNPV[n].name,
                        'val':  currentNPV[n].val-baselineNPV[n].val,
                        'decimals': currentNPV[n].decimals};
      }
      reports.npv = deltaNpv;

      // calculate total NPV
      return _.reduce(deltaNpv, function(a,b){return a + b.val;}, 0);

    }

    function runNpvReport(discount, years, fullReport){

      var reportMetrics  = _.pluck(_.where(fullReport[0].data,{isCurrency:true}),'name');
      var npvReport = [];

      for(var m=0;m<reportMetrics.length;m++) {

        npvReport[m] = {};
        npvReport[m] = {
          'name': reportMetrics[m],
          'val': 0,
          'isExpense': reportMetrics[m] === 'Revenue' ? false : true,
          'decimals': _.findWhere(fullReport[0].data,{name:reportMetrics[m]}).decimals
        };

        for(var y=0;y<years;y++) {
          npvReport[m].val = npvReport[m].val + (_.findWhere(fullReport[y].data,{name:reportMetrics[m]}).val)/Math.pow(1+discount,y);
        }
      }

      return npvReport;
    }

    reports.runReport = function(type){
      if (!type) {console.log('!!! - need to enter a report type');}

      
      console.log('2.1 go filterFinancialReport [' + type + ']');
      reports[type] = this.filterFinancialReport(type);
      console.log('2.2 Saved a new report [' + type + ']');

      // // if active not set yet, instantiate as base report
      // if (reports.active.length === 0) {
      //   angular.copy(reports.base, reports.active);
      //   // reports.active = reports.base;
      //   console.log('copied base to active');
      // }
      
    }

    reports.getMetricTotal = function(name){

      console.log('*() - Need to Hook up getMetricTotal()')
      return 11111111;
    }

    reports.setReport = function(type, report){
      // make sure a report type was passed in
      if (!type || !report) {
        console.log('!!! - need to enter a report type and report object');
        return
      }

      reports[type] = report;
    }

    reports.setFlightFinancials = function(type, report){
      if (!type || !report) { console.log('*** Need to enter more arguments!'); return;}

      flightFinancials[type] = report;
      console.log('1. Set Flight Financials[' + type + ']');
    }

    reports.getRevenueForecast = function(type){
      console.log('3. get new revenues')
      if (!type || !reports[type]) {console.log('invalid report type entered as argument'); return;}

      var revenueForecast = [];

      // loop through each annual forecast and retrieve the revenue object
      angular.forEach(reports[type], function(annualReport) {
        var revenue = _.where(annualReport.data, {'name': 'Revenue'});

        // make sure only 1 revenue object is being returned
        if (revenue.length !== 1) {
          console.log('Woah! - somethings goofed with the revenue forecasts!');
          return;
        }

        // append the current forecast year to the object being built for d3
        revenue[0].year = annualReport.year;

        //push revenue object to revenueForecast array formatted for d3
        revenueForecast.push(revenue[0]);
      });

      return revenueForecast;
    }
    reports.getRevenueForecastData = function(){
      var b =  reports.getRevenueForecast('base');
      var a =  reports.getRevenueForecast('active');
      var forecast = [];

      a.forEach(function(data, i){
        forecast.push({'year': data.year, 'base': b[i].val, 'active': data.val - b[i].val});
      })

      // revenue forcast data for D3;
      console.log('new forecast data - stacked chart should update!')
      return forecast;
    }

    function mapSum(a,b){
      return a+b;
    }

    reports.filterFinancialReport = function(type, routeName){
      
      // make sure the right inputs are supplied
      if (type!=='base' && type !=='active'){
        console.log('!WHoops! - need to pass in ACTIVE or BASE flag');
        return;
      }

      // if (isUpdate) then user active financials, otherwise use base
      var finReport = flightFinancials[type];
      var outputReports = [];
      var filteredReport;
      var yearReport = {};
      var airplanes;
      var reportMetrics = ['ASK','Crew','Freq','Fuel','Maintenance',
                            'Other','Ownership','PAX','RPM','Revenue','Seats'];
      var currency      = [false, true, false, true, true, true, true, false, false, true, false];
      var decimals      = [0,0,0,0,0,0,0,0,0,0,0];

      var equipment    = navService.equipment;
      var filterByAP = _.pluck(_.where(equipment,{active:true}),'code');
      var equipReport;

      for(var y=0;y<finReport.length;y++) {
        equipReport  = findArray(finReport[y].fleetReport,filterByAP,'Equipment');
        if (routeName) {
          filteredReport = _.where(equipReport,{NonDirectional: routeName});

          //Route Details Report
          yearReport.detail = {};
          yearReport.detail.origin = {  'City':    filteredReport[0].oCity,
                                        'Country': filteredReport[0].oCountry,
                                        'State':   filteredReport[0].oState,
                                        'Name':    filteredReport[0].oName,
                                        'IATA':    filteredReport[0].oIata};

          yearReport.detail.destination = {   'City':    filteredReport[0].dCity,
                                              'Country': filteredReport[0].dCountry,
                                              'State':   filteredReport[0].dState,
                                              'Name':    filteredReport[0].dName,
                                              'IATA':    filteredReport[0].dIata};

          var moFreq = _.reduceRight(_.pluck(filteredReport,'monday'),mapSum,0);
          var tuFreq = _.reduceRight(_.pluck(filteredReport,'tuesday'),mapSum,0);
          var weFreq = _.reduceRight(_.pluck(filteredReport,'wednesday'),mapSum,0);
          var thFreq = _.reduceRight(_.pluck(filteredReport,'thursday'),mapSum,0);
          var frFreq = _.reduceRight(_.pluck(filteredReport,'friday'),mapSum,0);
          var saFreq = _.reduceRight(_.pluck(filteredReport,'saturday'),mapSum,0);
          var suFreq = _.reduceRight(_.pluck(filteredReport,'sunday'),mapSum,0);

          yearReport.detail.route = {};
          yearReport.detail.route.freq = {};

          yearReport.detail.route.freq.total = moFreq+tuFreq+weFreq+thFreq+frFreq+saFreq+suFreq;
          yearReport.detail.route.freq.days = [moFreq,tuFreq,weFreq,thFreq,frFreq,saFreq,suFreq];

          yearReport.detail.route.distance = filteredReport[0].Distance;

        }
        else
        {
          filteredReport = equipReport;
          yearReport.detail = {};
        }

        airplanes       = _.uniq(_.pluck(filteredReport,'Equipment'));

        // yearReport.year = filteredReport[0].Year;
        yearReport.year = _.uniq(_.pluck(finReport[y].fleetReport,'Year'))[0];

        yearReport.data = [];
        var totalval = 0;
        var apval = 0;

        //Report for Each Metric
        for(var m=0;m<reportMetrics.length;m++) {
          if(filteredReport !== []) {
            totalval = _.reduceRight(_.pluck(filteredReport,reportMetrics[m]),mapSum,0);
          }

          yearReport.data[m] = {'name': reportMetrics[m],
                                'val' : totalval,
                                'isCurrency': currency[m],
                                'isExpense': reportMetrics[m] === 'Revenue' ? false : true,
                                'decimals': decimals[m]
                              };

          yearReport[reportMetrics[m]] = {};
          yearReport[reportMetrics[m]].data = [];
          for(var a=0;a<airplanes.length;a++) {
            if(filteredReport !== []) {
              apval = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment: airplanes[a]}),reportMetrics[m]),mapSum,0);
            }
            yearReport[reportMetrics[m]].data[a] = {'equipment': airplanes[a],
                                                    'val': apval};

            apval = 0;
          }
          totalval = 0;
        }

        //Per Flight Per Equipment Report
        yearReport.perFlight = [];
        for(var x=0;x<airplanes.length;x++)
        {
          yearReport.perFlight[x] = {};
          yearReport.perFlight[x].equipment = airplanes[x];
          yearReport.perFlight[x].metrics = [];

          for(var n=0;n<reportMetrics.length;n++)
          {
            var calcValue = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment:airplanes[x]}),reportMetrics[n]),mapSum,0);
            var calFreq   = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment:airplanes[x]}),'Freq'),mapSum,0);
            yearReport.perFlight[x].metrics[n] = {'name': reportMetrics[n],
                                                  'val' : calcValue/calFreq,
                                                  'isCurrency': currency[n],
                                                  'isExpense': reportMetrics[n] === 'Revenue' ? false : true,
                                                  'decimals': decimals[n]};
          }
        }

        outputReports.push(yearReport);
        yearReport = {};
      }

      return outputReports;
    }




    function findArray(inputArray,searchCrit,key){

      var critReturn = [];
      var outputArray = [];

      for(var crit=0;crit<searchCrit.length;crit++) {
        critReturn = eval('_.where(inputArray,{'+key+':"'+searchCrit[crit]+'"})');

        if(crit===0) {
          outputArray = critReturn;
        }
        else {
          for(var j in critReturn) {
            outputArray.push(critReturn[j]);
          }
        }
      }
      return outputArray;
    }

    return reports;

    // // Public API here
    // return {
    //   // getters
    //   getFullReport: function(){
    //     return filterFinancialReport();
    //   },
    //   getRouteReport: function(routeName){
    //     return filterFinancialReport(routeName);
    //   },
    //   getActiveId: function(name) {
    //     // this is bad!
    //     return eval(name);
    //   },
    //   getYears: function(){
    //     return _.pluck(filterFinancialReport(), 'year');
    //   },

    //   // setters
    //   setReport: function(report){
    //     financialReport = report;
    //   },
    //   setActiveReport: function(name) {
    //     activeReport = name;
    //   },
    //   setActiveYear: function(id) {
    //     activeYear = id;
    //   },
    //   getNPVReport: function(discount,years,currentReport,baselineReport) {
    //     var currentNPV  = runNpvReport(discount, years, currentReport);
    //     var baselineNPV = runNpvReport(discount, years, baselineReport);
    //     // var currentNPV  = npvReport(discount, years, filterFinancialReport());
    //     // var baselineNPV = npvReport(discount, years, filterFinancialReport());

    //     var deltaNpv = [];
    //     for(var n=0;n<currentNPV.length;n++)
    //     {
    //       deltaNpv[n] = {};

    //       deltaNpv[n] = { 'name': currentNPV[n].name,
    //                       'val':  currentNPV[n].val-baselineNPV[n].val,
    //                       'decimals': currentNPV[n].decimals};
    //     }

    //     return deltaNpv;

    //   },
    //   getPerFltRevenue: function(){
    //     return perFltRev;
    //   },
    //   getRevenueForecast: function(report){
    //     // var revenue = [];
    //     var revenueForecast = [];

    //     // loop through each annual forecast and retrieve the revenue object
    //     angular.forEach(report, function(annualReport) {
    //       var revenue = _.where(annualReport.data, {'name': 'Revenue'});

    //       // make sure only 1 revenue object is being returned
    //       if (revenue.length !== 1) {
    //         console.log('Woah! - somethings goofed with the revenue forecasts!');
    //         return;
    //       }

    //       // append the current forecast year to the object being built for d3
    //       revenue[0].year = annualReport.year;

    //       //push revenue object to revenueForecast array formatted for d3
    //       revenueForecast.push(revenue[0]);
    //     });

    //     return revenueForecast;
    //   }
    // };

  });
