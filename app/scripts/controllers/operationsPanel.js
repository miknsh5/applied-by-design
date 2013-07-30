'use strict';

angular.module('appliedByDesignApp')
  .controller('OperationsPanelCtrl', function ($scope, navService, routeService, financialReports) {
    
    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;

    $scope.routeChartData = [
            {'name': 'A', 'val': 10},
            {'name': 'B', 'val': 15},
            {'name': 'C', 'val': 8},
            {'name': 'D', 'val': 22}
        ]



    $scope.routeReport = routeService.setRouteReport('DENSEA');
    $scope.details = $scope.routeReport[0].detail;

    $scope.selectDay = function(id) {
        $scope.dotw = routeService.setActiveDay(id);
    }
    $scope.selectDay(0); //initialize selected day


    
  });
