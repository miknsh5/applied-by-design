'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, reportBuilder, financialData, fleetModel, navService, frequencyService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 1200;

    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;


    // instantiate service object in local controller scope (makes service accessible directly from view)
    $scope.fleetModel = fleetModel;
    $scope.reportBuilder = reportBuilder;
    $scope.navService = navService;

    $scope.reportBuilder.generateEquipment();
    $scope.reportBuilder.buildRoutes();

    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
        var offset = -250;
        var b = ($scope.hidePanel) ? offset : 0;

        return {
            bottom: b + 'px'
        }
    }

    // watch for any changes to the aircraft toggle buttons and update
    // routes whenever there's a change.
    $scope.$watch(function(){return navService.getEquipment()}, function(){
        reportBuilder.buildRoutes();
    }, true);

  });


