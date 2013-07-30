'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, financialReports) {
    
    // build initial set of financial reports. This should only need to be done once unless 
    // changes are made to add new flights or reconfigure services.
    reportBuilder.buildFinancialReport(true);

    $scope.financialReports = financialReports;

    // store reports for total of all operations for comparison (orange column on financial tab)
    // instantiate once at initial page load
    $scope.financialData_total  = financialReports.getFullReport();
    $scope.financialData_active = financialReports.getFullReport();
    $scope.fiscalYears = financialReports.getYears();
    $scope.activeReportName = 'Crew';
    $scope.activeYearId   = 0;
    // $scope.selectedReport = _.findWhere($scope.financialData_active[$scope.activeYearId].data, {name: $scope.activeReportName});
    $scope.activeChartData = $scope.financialData_active[$scope.activeYearId][$scope.activeReportName].data;
    $scope.activeChartData.total = assignChartTotal('Crew');

    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;

    $scope.$watch(function(){ return financialReports.getFullReport()}, function(newData){
        $scope.financialData_active = newData;
    }, true);


    $scope.$watch(function(){ return financialReports.getActiveId('activeReport')}, function(newData){
       $scope.activeReportName = newData;
    }, false);

    $scope.$watch(function(){ return financialReports.getActiveId('activeYear')}, function(newData){
       $scope.activeYearId = newData;
    }, false);


    $scope.selectReport = function(name){
        // when a user selects a new report in the table
        financialReports.setActiveReport(name);
        $scope.activeChartData = $scope.financialData_active[$scope.activeYearId][name].data;
        $scope.activeChartData.total = assignChartTotal(name);

    }
    $scope.selectYear = function(id){
        //when a user selects a new financial year
        financialReports.setActiveYear(id);
    }

    $scope.getActiveRecord = function(recordName){
        return _.findWhere($scope.financialData_active[$scope.activeYearId].data, {name: recordName})
    }


    function assignChartTotal(name){
        return $scope.activeChartData.total = _.findWhere($scope.financialData_total[$scope.activeYearId].data, {name: name});
    }


    // chart example
    $scope.options = {width: 150, height: 150, 'bar':'aaa'};
    $scope.data = [1,2,3,4];
    $scope.hovered = function(d){
        $scope.barValue = d.value;
        $scope.$apply();
    }
    $scope.barValue = 'None';

    $scope.update = function(d, i){ 
        $scope.data = randomData(); 
    }

    function randomData(){
        // return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
        var data = $scope.data;
        data[0] = data[0] * 1.8;
        return data;
    }

  });
