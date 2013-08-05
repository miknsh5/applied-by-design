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

    $scope.metrics_new = $scope.financialData_active[0].perFlight[0].metrics;
    $scope.metrics_base = $scope.financialData_total[0].perFlight[0].metrics;

    $scope.revenueForecast = financialReports.getRevenueForecast($scope.financialData_total);


    // calculate per flight operating profit average from financial Report
    $scope.operatingProfit = function(type){
      var data = (type=='delta') ? $scope.metrics_delta : $scope.metrics_base;

      return _.reduce(data, function(a, b){
        var sign = b.isExpense ? -1 : 1;
        // only add to the operating profit if the metric is a currency value (i.e. not a KPI metric)
        if (b.isCurrency) {
          return a + b.val*sign;
        } else {
          return a;
        }
      }, 0);
    }

    $scope.perFlightDeltas = function(){
      var metricsA = $scope.metrics_new;
      var metrics0 = $scope.metrics_base;
      var deltaMetrics = [];
      for (var i=0; i<metricsA.length; i++) {
        var delta = metricsA[i].val - metrics0[i].val;
        deltaMetrics.push({
            'name': metricsA[i].name,
            'val': delta, 
            'isCurrency': metricsA[i].isCurrency,
            'isExpense': metricsA[i].isExpense,
            'decimals': metricsA[i].decimals 
          })
      }
      return deltaMetrics;
    };

    // Initialize delta comparison report
    $scope.metrics_delta = $scope.perFlightDeltas();

  });
