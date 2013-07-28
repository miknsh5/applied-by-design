'use strict';

angular.module('appliedByDesignApp')
  .factory('financialReports', function () {
    // Service logic

    var financialReport = [];
    var activeReportId  = 0;
    var activeYearId    = 0;

    // Public API here
    return {
      getFullReport: function(){
        return financialReport;
      },
      getActiveReport: function(){
        return financialReport[activeReportId];
      },
      getActiveId: function() {
        return activeReportId;
      },
      getFleetBreakdown: function(){

        // var breakdown = [];
        
        // // loop through each aircraft report for current year
        // angular.forEach(financialReport[activeYearId].fleetReport, function(aircraft, key){
        //   breakdown[key] = {'name': aircraft.Equipment}
        // })
        // // retrieve the data record corresponding to the current active Id

        // // build and return object with per airplane financials
        // return breakdown
      },

      setReport: function(report){
        financialReport = report;
      },
      selectReport: function(id) {
        activeReportId = id;
      }


    };


    function formatFinancialReport(newData) {


        // when no aircraft selected and newData is empty, set all values = 0
        if (newData.length == 0) {
            newData.push({
                'Revenue':  0,
                'Costs':    0,
                'Profit':   0,
                'RPM':      0,
                'ASK':      0,
                'PAX':      0,
                'Seats':    0
                });
        } else {
          newData = newData[activeYearId].fleetReport;
        }

        var formattedData = [
            {'name': 'Revenue',           'val': newData[0].Revenue, 'currency': true,  'decimals':0},
            {'name': 'Operating Costs',   'val': newData[0].Costs,   'currency': true,  'decimals':0},
            {'name': 'Operating Profit',  'val': newData[0].Profit,  'currency': true,  'decimals':0},
            {'name': 'RPM',               'val': newData[0].RPM,     'currency': false, 'decimals':0},
            {'name': 'ASK',               'val': newData[0].ASK,     'currency': false, 'decimals':0},
            {'name': 'PAX',               'val': newData[0].PAX,     'currency': false, 'decimals':0},
            {'name': 'Seats',             'val': newData[0].Seats,   'currency': false, 'decimals':0}
        ];
        
        return formattedData;
    }

  });
