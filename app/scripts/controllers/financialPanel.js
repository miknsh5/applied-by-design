'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, navService) {
    
    reportBuilder.buildFinancialReport();
    reportBuilder.buildOperationsReport();

    // store reports for total of all operations for comparison (orange column on financial tab)
    // instantiate once at initial page load
    $scope.financialData_total  = reportBuilder.getReport('financialReport');
    $scope.operationsData_total = reportBuilder.getReport('operationsReport');


    // watch for any changes to the routeReports object
    $scope.$watch(function() { return reportBuilder.getReport('routeReport')}, function(newData){
        reportBuilder.buildFinancialReport();
        reportBuilder.buildOperationsReport();
    }, true);


    $scope.$watch(function(){ return reportBuilder.getReport('financialReport')}, function(newData){
        $scope.financialData = newData;
    }, true);

    $scope.$watch(function(){ return reportBuilder.getReport('operationsReport')}, function(newData){
        $scope.operationsData = newData;
    }, true);



  });
