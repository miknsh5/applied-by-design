'use strict';

angular.module('appliedByDesignApp')
  .factory('financialReports', function (navService) {
    // Service logic

    var financialReport = [];
    var activeReport  = 'Crew'; //name
    var activeYear    = 0;      //id

    // Public API here
    return {
      // getters
      getFullReport: function(){
        return filterFinancialReport();
      },
      getRouteReport: function(routeName){
        return filterFinancialReport(routeName);
      },
      getActiveReport: function(){
        return financialReport[activeReportId];
      },
      getActiveId: function(name) {
        return eval(name);
      },
      getYears: function(){
        return _.pluck(filterFinancialReport(), 'year');
      },

      // setters
      setReport: function(report){
        financialReport = report;
      },
      setActiveReport: function(name) {
        activeReport = name;
      },
      setActiveYear: function(id) {
        activeYear = id;
      }
      
    };

    function filterFinancialReport(routeName){

      var finReport = financialReport;
      var outputReports = [];
      var filteredReport;
      var yearReport = {};
      var airplanes;
      var reportMetrics = ['ASK','Crew','Freq','Fuel','Maintenance',
                            'Other','Ownership','PAX','RPM','Revenue','Seats'];
      var currency      = [false, true, false, true, true, true, true, false, false, true, false];
      var decimals      = [0,0,0,0,0,0,0,0,0,0,0];

      var equipment    = navService.getEquipment();
      var filterByAP = _.pluck(_.where(equipment,{active:true}),'code');
      var equipReport;

      for(var y=0;y<finReport.length;y++)
      {
        equipReport  = findArray(finReport[y].fleetReport,filterByAP,"Equipment");
        if (typeof routeName != 'undefined')
        {
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

          var moFreq = _.reduceRight(_.pluck(filteredReport,'monday'),function(a,b){return a+b},0);
          var tuFreq = _.reduceRight(_.pluck(filteredReport,'tuesday'),function(a,b){return a+b},0);
          var weFreq = _.reduceRight(_.pluck(filteredReport,'wednesday'),function(a,b){return a+b},0);
          var thFreq = _.reduceRight(_.pluck(filteredReport,'thursday'),function(a,b){return a+b},0);
          var frFreq = _.reduceRight(_.pluck(filteredReport,'friday'),function(a,b){return a+b},0);
          var saFreq = _.reduceRight(_.pluck(filteredReport,'saturday'),function(a,b){return a+b},0);
          var suFreq = _.reduceRight(_.pluck(filteredReport,'sunday'),function(a,b){return a+b},0);

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
        for(var m=0;m<reportMetrics.length;m++)
        {
          if(filteredReport != [])
          {
            totalval = _.reduceRight(_.pluck(filteredReport,reportMetrics[m]),function(a,b){return a+b;},0);
          }

          yearReport.data[m] = {'name': reportMetrics[m],
                                'val' : totalval,
                                'isCurrency': currency[m],
                                // 'currency': currency[m] == false ? false : true,
                                'decimals': decimals[m]
                              };

          yearReport[reportMetrics[m]] = {};
          yearReport[reportMetrics[m]].data = [];
          for(var a=0;a<airplanes.length;a++)
          {
            if(filteredReport != [])
            {
              apval = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment: airplanes[a]}),reportMetrics[m]),function(a,b){return a+b;},0);
            }
            yearReport[reportMetrics[m]].data[a] = {'equipment': airplanes[a],
                                                    'val': apval};

            apval = 0;
          }
          totalval = 0;
        }

        //Per Flight Per Equipment Report
        yearReport.perFlight = [];
        for(var a=0;a<airplanes.length;a++)
        {
          yearReport.perFlight[a] = {};
          yearReport.perFlight[a].equipment = airplanes[a];
          yearReport.perFlight[a].metrics = [];

          for(var m=0;m<reportMetrics.length;m++)
          {
            var calcValue = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment:airplanes[a]}),reportMetrics[m]),function(a,b){return a+b},0);
            var calFreq   = _.reduceRight(_.pluck(_.where(filteredReport,{Equipment:airplanes[a]}),'Freq'),function(a,b){return a+b},0);
            yearReport.perFlight[a].metrics[m] = {'name': reportMetrics[m],
                                                  'val' : calcValue/calFreq,
                                                  'isCurrency': currency[m],
                                                  'decimals': decimals[m]};
          }
        }

        outputReports.push(yearReport);
        yearReport = {};
      }

      return outputReports;
    }

    function findArray(inputArray,searchCrit,key){

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
    }

    
  });
