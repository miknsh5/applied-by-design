'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, navService) {
    
    reportBuilder.buildFinancialReport();
    reportBuilder.buildOperationsReport();

    $scope.financialData  = [];
    $scope.operationsData = [];


    // watch for any changes to the routeReports object
    $scope.$watch(function() { return reportBuilder.getReport('routeReport')}, function(newData){
        reportBuilder.buildFinancialReport();
        reportBuilder.buildOperationsReport();
    }, true);


    $scope.$watch(function(){ return reportBuilder.getReport('financialReport')}, function(newData){
        
        // when no aircraft selected and newData is empty, set all values = 0
        if (newData.length == 0) {
            newData.push({
                'Revenue':  0,
                'Costs':    0,
                'Profit':   0
                });
        }

        $scope.financialData = [
            {'name': 'Revenue',           'val': newData[0].Revenue, 'currency': true},
            {'name': 'Operating Costs',   'val': newData[0].Costs,   'currency': true},
            {'name': 'Operating Profit',  'val': newData[0].Profit,  'currency': true}
        ];

    }, true);

    $scope.$watch(function(){ return reportBuilder.getReport('operationsReport')}, function(newData){
        
        // when no aircraft selected and newData is empty, set all values = 0
        if (newData.length == 0) {
            newData.push({
                'RPM':    0,
                'ASK':    0,
                'PAX':    0,
                'Seats':  0
                });
        }
        
        
        $scope.operationsData = [
            {'name': 'RPM',   'val': newData[0].RPM,   'currency': false, 'decimals':0},
            {'name': 'ASK',   'val': newData[0].ASK,   'currency': false, 'decimals':0},
            {'name': 'PAX',   'val': newData[0].PAX,   'currency': false, 'decimals':0},
            {'name': 'Seats', 'val': newData[0].Seats, 'currency': false, 'decimals':0}
        ];

    }, true);

  });
