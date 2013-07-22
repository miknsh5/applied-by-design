'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, financialData, fleetModel) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 700;

    // initialize dashboard panel visibility
    $scope.isFinActive = true;
    $scope.isOpsActive = false;
    $scope.isFltActive = false;

    $scope.activeFinanceData = [];

    // instantiate service object in local controller scope (makes service accessible directly from view)
    $scope.fleetModel = fleetModel;
    $scope.financialData = financialData;

  });


