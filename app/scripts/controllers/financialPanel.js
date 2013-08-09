'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, financialReports, navService) {

    // instantiate once at initial page load

    $scope.fiscalYears         = financialReports.getYears();
    $scope.baseFinancialData   = financialReports.getReport('base');
    $scope.activeFinancialData = financialReports.getReport('active');
    $scope.activeYearId        = navService.activeYear;

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
      navService.activeMetricName = name;
      $scope.activeChartData = $scope.activeFinancialData[$scope.activeYearId][name].data;
      // $scope.activeChartData.total = assignChartTotal(name);
    };

    $scope.selectYear = function(id){
      //when a user selects a new financial year in the left side panel
      financialReports.setActiveYear(id);
    };




    $scope.getActiveRecord = function(recordName){
      return _.findWhere($scope.activeFinancialData[$scope.activeYearId].data, {name: recordName});
    };


    function assignChartTotal(name){
      var total = financialReports.getMetricTotal(name);
      // var total = _.findWhere($scope.financialDataBase[$scope.activeYearId].data, {name: name});
      // $scope.activeChartData.total = total;
      return total;
    }
    // $scope.activeChartData.total = assignChartTotal('Crew');

  });
