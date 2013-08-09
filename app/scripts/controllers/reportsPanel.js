'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports) {

    $scope.financialDataBase  = financialReports.getFullReport();
    $scope.financialDataActive = financialReports.getFullReport();

    // $scope.fleet            = navService.equipment;
    // $scope.fleetServices    = $scope.fleet[navService.activeFleetModel].details;
    $scope.ikons = ['mobile', 'wrench', 'cog-2', 'stats'];

    $scope.fleetModel = navService.equipment[0];

    $scope.toggleService = function(id){
      $scope.fleetModel = navService.toggleFleetService(id)[0];
    };


    //DATA NEEDED FOR REPORT
    // 1. Per Flight Financial Averages
    //    - call to financialReports
    // 2. Fleet Model Services and their state (true/false)
    //    - call to equipmentService
    // 3. 5 Year Revenue Forecasts [{#, year},{...}]
    //    - call to financialReports
    // 4. Total NPV as function of (Discount Rate, Duration)
    //    - call to financialReports


    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    $scope.npvReport = financialReports.getNPVReport($scope.rate, $scope.years, $scope.financialDataBase, $scope.financialDataActive);
    // $scope.npvReport = financialReports.getNPVReport($scope.rate, $scope.years);
    $scope.npv = _.reduce($scope.npvReport, function(a,b){return a + b.val;}, 0);

    // return array of values for each fleet models' avg-per-flight revenue
    $scope.perFltRev = financialReports.getPerFltRevenue($scope.npvReport);

    $scope.metricsNew = $scope.financialDataActive[0].perFlight[0].metrics;
    $scope.metricsBase = $scope.financialDataBase[0].perFlight[0].metrics;

    $scope.revenueForecast = financialReports.getRevenueForecast($scope.financialDataBase);

    // calculate per flight operating profit average from financial Report
    $scope.operatingProfit = function(type){
      var data = (type==='delta') ? $scope.metricsDelta : $scope.metricsBase;

      return _.reduce(data, function(a, b){
        var sign = b.isExpense ? -1 : 1;
        // only add to the operating profit if the metric is a currency value (i.e. not a KPI metric)
        if (b.isCurrency) {
          return a + b.val*sign;
        } else {
          return a;
        }
      }, 0);
    };

    $scope.perFlightDeltas = function(){
      var metricsA = $scope.metricsNew;
      var metrics0 = $scope.metricsBase;
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

    // Initialize delta comparison report
    $scope.metricsDelta = $scope.perFlightDeltas();

  });
