'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, financialData, fleetModel) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 1200;

    // initialize dashboard panel visibility
    $scope.isFinActive = true;
    $scope.isOpsActive = false;
    $scope.isFltActive = false;


    $scope.activeFinanceData = [];

    // instantiate service object in local controller scope (makes service accessible directly from view)
    $scope.fleetModel = fleetModel;
    $scope.financialData = financialData;



    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
        var offset = -250;
        var b = ($scope.hidePanel) ? offset : 0;

        return {
            // width: $scope.mapWidth + 'px',
            bottom: b + 'px'
        }
    }
  });


