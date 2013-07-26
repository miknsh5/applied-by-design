'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, financialReports, navService) {
    
    reportBuilder.buildFinancialReport(true, false);

    // store reports for total of all operations for comparison (orange column on financial tab)
    // instantiate once at initial page load
    $scope.financialData_total  = financialReports.getFullReport();


    // watch for any changes to the routeReports object
    $scope.$watch(function() { return reportBuilder.getReport('routeReport')}, function(newData){
        reportBuilder.buildFinancialReport(true, false);
    }, true);


    $scope.$watch(function(){ return financialReports.getFullReport()}, function(newData){
        $scope.financialData = newData;
    }, true);


    $scope.$watch(function(){ return financialReports.getActiveId()}, function(newData){
       $scope.activeFinancialReport = newData;
       $scope.selectedReport = financialReports.getActiveReport()
    }, false);


    $scope.selectReport = function(id){
        financialReports.selectReport(id);
    }

  });
