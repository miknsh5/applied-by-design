'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports, reportBuilder) {

    $scope.ikons = ['mobile', 'wrench', 'cog-2', 'stats'];

    $scope.fleetModel = function (){
      return navService.equipment[navService.activeFleetModel];
    }

    $scope.deltaMetrics = function(){
      return financialReports.getDeltaMetrics();
    }

    // $scope.deltaMetrics = financialReports.getDeltaMetrics();
    
    $scope.toggleService = function(id){
      navService.toggleFleetService(id)[0];
      reportBuilder.buildFinancialReport(true, true);
      
    };


    $scope.metricsBase = function(){
      return financialReports.getFlightMetrics('base');
    };

    $scope.metricsActive = function(){
      return financialReports.getFlightMetrics('active');
    };



    $scope.incrementRate = function(incr) {
      $scope.rate += incr; 
    }
    $scope.changeDuration = function(yr) {
      $scope.years = yr; 
    }
    $scope.prevModel = function(){
      var id = navService.activeFleetModel -= 1;

      // loop around to other end of equipment if id < 0
      if (id < 0) { id = navService.equipment.length - 1;}
      navService.activeFleetModel = id;
    }

    $scope.nextModel = function(){
      var id = navService.activeFleetModel += 1;

      // loop around to other end of equipment if id > equip length
      if (id > navService.equipment.length-1) { id = 0;}
      navService.activeFleetModel = id;
    }

    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    $scope.npvTotal = function(){
      return financialReports.getNpv($scope.rate, $scope.years);
    }

    $scope.$watch(function(){return financialReports.getReport('active');}, function(){
      console.log('4.0 New Revenues!');
      $scope.revenueForecast = financialReports.getRevenueForecastData();
      // console.log($scope.revenueForecast);
    }, true);

    

    // $scope.revenueForecast = financialReports.getRevenueForecastData();
    

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
