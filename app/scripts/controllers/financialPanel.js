'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, navService, fleetModel) {
    
    reportBuilder.buildFinancialReport();
    reportBuilder.buildOperationsReport();

    $scope.financialData  = [];
    $scope.operationsData = [];

    $scope.$watch(function(){ return reportBuilder.getReport('financialReport')}, function(newData){
        $scope.financialData = [
            {'name': 'Revenue', 'val': newData[0].Revenue, 'currency': true},
            {'name': 'Costs',   'val': newData[0].Costs,   'currency': true},
            {'name': 'Profit',  'val': newData[0].Profit,  'currency': true}
        ];

    }, true)

    $scope.$watch(function(){ return reportBuilder.getReport('operationsReport')}, function(newData){
        $scope.operationsData = [
            {'name': 'RPM',   'val': newData[0].RPM,   'currency': false},
            {'name': 'ASK',   'val': newData[0].ASK,   'currency': false},
            {'name': 'PAX',   'val': newData[0].PAX,   'currency': false},
            {'name': 'Seats', 'val': newData[0].Seats, 'currency': false}
        ];

    }, true)

  });
