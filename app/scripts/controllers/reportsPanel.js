'use strict';

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports) {

    $scope.financialData_total  = financialReports.getFullReport();
    $scope.financialData_active = financialReports.getFullReport();

    // $scope.forecastData = financialData_active[2].data[9]

    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    $scope.npvReport = financialReports.getNPVReport($scope.rate, $scope.years);
    $scope.npv = _.reduce($scope.npvReport, function(a,b){
      var sign = b.isExpense ? -1 : 1;
      return a + b.val * sign;
    }, 0);
    
    // return array of values for each fleet models' avg per flight revenue
    $scope.perFltRev = financialReports.getPerFltRevenue($scope.npvReport);

    $scope.metrics = $scope.financialData_active[0].perFlight[0].metrics;

    $scope.revenueForecast = financialReports.getRevenueForecast($scope.financialData_total);


    // calculate per flight operating profit average from financial Report
    $scope.operatingProfit = function(){
      return _.reduce($scope.metrics, function(a, b){
        var sign = b.isExpense ? -1 : 1;
        // only add to the operating profit if the metric is a currency value (i.e. not a KPI metric)
        if (b.isCurrency) {
          return a + b.val*sign;
        } else {
          return a;
        }
      }, 0);
    }


  });
