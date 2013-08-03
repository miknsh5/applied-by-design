'use strict';

angular.module('appliedByDesignApp')
  .controller('ReportsPanelCtrl', function ($scope, navService, financialReports) {

    $scope.financialData_total  = financialReports.getFullReport();
    $scope.financialData_active = financialReports.getFullReport();

    //NPV Calculation
    $scope.years = 5;
    $scope.rate = 0.08;
    $scope.npvReport = financialReports.getNPVReport($scope.rate, $scope.years);
    $scope.npv = _.reduce($scope.npvReport, function(a,b){return a + b.val}, 0);
    
    $scope.metrics = $scope.financialData_active[0].perFlight[0].metrics;

  });
