'use strict';
/*global _:false */

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, financialReports, navService) {

    $scope.fiscalYears = financialReports.getYears();
    $scope.activeYearId = navService.activeYear;
    
    $scope.baseFinancialData = function(){
      return financialReports.getReport('base')[navService.activeYear];
    };

    $scope.activeFinancialData = function(){
      return financialReports.getReport('active')[navService.activeYear];
    };

    $scope.chartData = function(){
      return $scope.activeFinancialData()[navService.activeMetricName].data;
    };

    $scope.activeReportName = function(){
      return navService.activeMetricName;
    };

    $scope.selectReport = function(name){
      // when a user selects a new report in the summary table
      navService.activeMetricName = name;
    };

    $scope.selectYear = function(id){
      //when a user selects a new financial year in the left side panel
      navService.activeYear = id;
      $scope.activeYearId = id;
    };

    $scope.getActiveRecord = function(recordName){
      return _.findWhere($scope.activeFinancialData().data, {name: recordName});
    };


  });
