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
    $scope.npv = _.reduce($scope.npvReport, function(a,b){return a + b.val}, 0);
    
    $scope.metrics = $scope.financialData_active[0].perFlight[0].metrics;

    $scope.revenueForecast = financialReports.getRevenueForecast($scope.financialData_total);



    $scope.forecastData = [
      {
        'year': 2013,
        'values': [
          {'x': 0, 'y': 100},
          {'x': 1, 'y': 120}
        ]
      },      {
        'year': 2014,
        'values': [
          {'x': 0, 'y': 130},
          {'x': 1, 'y': 150}
        ]
      },      {
        'year': 2013,
        'values': [
          {'x': 0, 'y': 120},
          {'x': 1, 'y': 140}
        ]
      }
    ];


  });
