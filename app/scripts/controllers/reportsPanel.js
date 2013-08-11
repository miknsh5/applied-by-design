'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports, reportBuilder) {

    $scope.ikons = ['mobile', 'wrench', 'cog-2', 'stats'];

    $scope.fleetModel = navService.equipment[0];

    $scope.toggleService = function(id){
      $scope.fleetModel = navService.toggleFleetService(id)[0];
      // $scope.$emit('serviceUpdate', id);
      reportBuilder.buildFinancialReport(true, true);
    };


    $scope.metricsBase = function(){
      return financialReports.getFlightMetrics('base');
    };

    $scope.metricsActive = function(){
      return financialReports.getFlightMetrics('active');
    };

    $scope.deltaMetrics = function(){
      return financialReports.getDeltaMetrics();
    }



    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    $scope.npvTotal = function(){
      return financialReports.getNpv($scope.rate, $scope.years);
    }

    $scope.$watch(function(){return financialReports.getReport('active');}, function(){
    //   console.log('yep - new active Report!');
      console.log('New Revenues!');
      // $scope.revenueForecast = financialReports.getRevenueForecastData();
      // console.log($scope.revenueForecast);
    }, true);

    

    $scope.revenueForecast = financialReports.getRevenueForecastData();
    

    // binding return function directly to the directive data attribute makes angular explode
    // $scope.revenueForecast = $scope.getRevenues();

    // calculate per flight operating profit average from financial Report
    $scope.operatingProfit = function(type){
      var data = (type==='delta') ? financialReports.getDeltaMetrics() : financialReports.getFlightMetrics('base');

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




    // $scope.perFlightDeltas = function(){
    //   if ($scope.metricsActive.length === 0) {return [];}

    //   var metricsA = financialReports.getFlightMetrics('active');
    //   var metrics0 = financialReports.getFlightMetrics('base');
    //   var deltaMetrics = [];
    //   for (var i=0; i<metricsA.length; i++) {
    //     var delta = metricsA[i].val - metrics0[i].val;
    //     deltaMetrics.push({
    //         'name': metricsA[i].name,
    //         'val': delta,
    //         'isCurrency': metricsA[i].isCurrency,
    //         'isExpense': metricsA[i].isExpense,
    //         'decimals': metricsA[i].decimals
    //       });
    //   }
    //   return deltaMetrics;
    // };


  });
