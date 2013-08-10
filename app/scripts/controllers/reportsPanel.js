'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports) {

    $scope.ikons = ['mobile', 'wrench', 'cog-2', 'stats'];

    $scope.fleetModel = navService.equipment[0];

    $scope.toggleService = function(id){
      $scope.fleetModel = navService.toggleFleetService(id)[0];
    };

    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    // $scope.npvReport = financialReports.getNPVReport($scope.rate, $scope.years)

    $scope.npvTotal = function(){
      var npvReport = financialReports.getNPVReport($scope.rate, $scope.years)
      return _.reduce(npvReport, function(a,b){return a + b.val;}, 0);
    }

    $scope.metricsActive = financialReports.getFlightMetrics('active')
    $scope.metricsBase = financialReports.getFlightMetrics('base')

    $scope.getRevenues = function(){
      var b =  financialReports.getRevenueForecast('base');
      var a =  financialReports.getRevenueForecast('active');
      var forecast = [];

      a.forEach(function(data, i){
        forecast.push({'year': data.year, 'base': b[i].val, 'active': data.val - b[i].val});
      })
      return forecast;
    }

    // binding return function directly to the directive data attribute makes angular explode
    $scope.revenueForecast = $scope.getRevenues();

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
      if ($scope.metricsActive.length === 0) {return [];}

      var metricsA = $scope.metricsActive;
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


  });
