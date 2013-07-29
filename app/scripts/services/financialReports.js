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
      // getChartData: function(){
        // return this.getFullReport()[activeYear][activeReport];
        // return this.getFullReport()[activeYear][activeReport];

      // },

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
        }
        else
        {
          filteredReport = equipReport;
        }

        airplanes       = _.uniq(_.pluck(filteredReport,'Equipment'));

        // yearReport.year = filteredReport[0].Year;
        yearReport.year = _.uniq(_.pluck(finReport[y].fleetReport,'Year'))[0];

        yearReport.data = [];
        var totalval = 0;
        var apval = 0;

        for(var m=0;m<reportMetrics.length;m++)
        {
          if(filteredReport != [])
          {
            totalval = _.reduceRight(_.pluck(filteredReport,reportMetrics[m]),function(a,b){return a+b;},0);
          }

          yearReport.data[m] = {'name': reportMetrics[m],
                                'val' : totalval,
                                'currency': currency[m],
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

    // function formatFinancialReport(newData) {


    //     // when no aircraft selected and newData is empty, set all values = 0
    //     if (newData.length == 0) {
    //         newData.push({
    //             'Revenue':  0,
    //             'Costs':    0,
    //             'Profit':   0,
    //             'RPM':      0,
    //             'ASK':      0,
    //             'PAX':      0,
    //             'Seats':    0
    //             });
    //     } else {
    //       newData = newData[activeYearId].fleetReport;
    //     }

    //     var formattedData = [
    //         {'name': 'Revenue',           'val': newData[0].Revenue, 'currency': true,  'decimals':0},
    //         {'name': 'Operating Costs',   'val': newData[0].Costs,   'currency': true,  'decimals':0},
    //         {'name': 'Operating Profit',  'val': newData[0].Profit,  'currency': true,  'decimals':0},
    //         {'name': 'RPM',               'val': newData[0].RPM,     'currency': false, 'decimals':0},
    //         {'name': 'ASK',               'val': newData[0].ASK,     'currency': false, 'decimals':0},
    //         {'name': 'PAX',               'val': newData[0].PAX,     'currency': false, 'decimals':0},
    //         {'name': 'Seats',             'val': newData[0].Seats,   'currency': false, 'decimals':0}
    //     ];
        
    //     return formattedData;
    // }

  });
