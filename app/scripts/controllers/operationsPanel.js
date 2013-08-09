'use strict';

angular.module('appliedByDesignApp')
  .controller('OperationsPanelCtrl', function ($scope, navService, routeService) {

    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;

    // initialize activeRouteReport and details object
    // routeService.setRouteReport(routeService.getActiveRouteName);
    routeService.runRouteReport();

    $scope.activeRouteReport = function(){
      return routeService.activeRoute[navService.activeYear];
    }

    $scope.dotw = function(){
      return routeService.frequencies;
    }


    // watch for changes to the activeRouteName set on routeService, get new activeRouteReport.
    // $scope.$watch(function(){ return routeService.getActiveRouteName(); }, function(newData){
    //     $scope.dotw = routeService.getDays();
    //     $scope.activeRouteReport = routeService.setRouteReport(newData);
    // });

    // change the day of the week selection in the left side panel
    $scope.selectDay = function(id) {
      routeService.setActiveDay(id);
    };
    $scope.selectDay(0); //initialize selected day


  });
