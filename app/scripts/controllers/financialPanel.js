'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, financialReports, navService) {



    // $scope.financialReports = financialReports;

    // store reports for total of all operations for comparison (orange column on financial tab)
    // instantiate once at initial page load
    // $scope.financialDataBase  = financialReports.getFullReport();
    // $scope.financialDataActive = financialReports.getFullReport();

    $scope.fiscalYears = financialReports.getYears();

    // $scope.activeReportName = 'Crew';
    // $scope.activeYearId   = 0;

    // navService.activeYear

    // $scope.activeChartData = $scope.financialDataActive[navService.activeYear][navService.activeMetricName].data;
    $scope.activeChartData = financialReports.getActiveChartData();

    // $scope.$watch(function(){ return financialReports.getFullReport();}, function(newData){
    //   $scope.financialDataActive = newData;
    // }, true);


    // $scope.$watch(function(){ return financialReports.getActiveId('activeReport');}, function(newData){
    //   $scope.activeReportName = newData;
    // }, false);

    // $scope.$watch(function(){ return financialReports.getActiveId('activeYear');}, function(newData){
    //   $scope.activeYearId = newData;
    // }, false);



    $scope.selectReport = function(name){
      // when a user selects a new report in the summary table
      financialReports.setActiveReport(name);
      $scope.activeChartData = $scope.financialDataActive[$scope.activeYearId][name].data;
      $scope.activeChartData.total = assignChartTotal(name);
    };

    $scope.selectYear = function(id){
      //when a user selects a new financial year in the left side panel
      financialReports.setActiveYear(id);
    };




    $scope.getActiveRecord = function(recordName){
      return _.findWhere($scope.financialDataActive[$scope.activeYearId].data, {name: recordName});
    };


    function assignChartTotal(name){
      var total = financialReports.getMetricTotal(name);
      // var total = _.findWhere($scope.financialDataBase[$scope.activeYearId].data, {name: name});
      // $scope.activeChartData.total = total;
      return total;
    }
    // $scope.activeChartData.total = assignChartTotal('Crew');

  });
