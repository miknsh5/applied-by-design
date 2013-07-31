'use strict';

angular.module('appliedByDesignApp')
  .controller('OperationsPanelCtrl', function ($scope, navService, routeService, financialReports) {
    
    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;


    $scope.routeReport = routeService.setRouteReport('ORDSEA');
    $scope.details = $scope.routeReport[0].detail;

    $scope.selectDay = function(id) {
        $scope.dotw = routeService.setActiveDay(id);
    }
    $scope.selectDay(0); //initialize selected day


    
  });
