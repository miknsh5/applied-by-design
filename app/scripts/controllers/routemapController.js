'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, financialData, fleetModel, navService, frequencyService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 1200;

    // set the dimensions of chart SVG
    $scope.chartWidth = 175;
    $scope.chartHeight = 175;

    $scope.activeFinanceData = [];

    // instantiate service object in local controller scope (makes service accessible directly from view)
    $scope.fleetModel = fleetModel;
    $scope.frequencyService = frequencyService;
    $scope.financialData = financialData;
    $scope.navService = navService;

    $scope.fleetModel.generateEquipment();
    $scope.fleetModel.generateRoutes();

    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
        var offset = -250;
        var b = ($scope.hidePanel) ? offset : 0;

        return {
            bottom: b + 'px'
        }
    }
  });


