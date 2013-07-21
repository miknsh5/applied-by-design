'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, fleetRouteData, byFleetTypeFilter, activeFleetModelsFilter, financialData) {

    // load the data with route resolve function in app.js, don't load page until data is ready
    // this fixes the issue with async directive data binding

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 700;


    // initialize dashboard panel visibility
    $scope.isFinActive = true;
    $scope.isOpsActive = false;
    $scope.isFltActive = false;

    $scope.activeFinanceData = [];

    // $scope.fleetRouteData = fleetRouteData;
    $scope.fleetRouteData_filtered = fleetRouteData;


    // hardcode fleet models for now.  
    // Should update this to derive fleet from imported route schedule
    $scope.fleetModels = [
        {'name': '737-900', 'active': true},
        {'name': '737-800', 'active': true},
        {'name': '737-700', 'active': true},
        {'name': '737-400', 'active': true}
      ];

    $scope.financialData = financialData;
    // $scope.financialSummary = financialData.getTotals();
    // $scope.activeChart = financialData.getActive();

    // initialize activeChart data with 

    $scope.applyFleetFilter = function(){
      
      var filterBy = activeFleetModelsFilter($scope.fleetModels);
      $scope.fleetRouteData_filtered = byFleetTypeFilter(fleetRouteData, filterBy);

    }



  });


