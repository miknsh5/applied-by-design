'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, fleetRouteData) {
    
    // load the data with route resolve function in app.js, don't load page until data is ready
    // this fixes the issue with async directive data binding

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 700;


    // initialize dashboard panel visibility
    $scope.isFinActive = true;
    $scope.isOpsActive = false;
    $scope.isFltActive = false;

    $scope.fleetRouteData = fleetRouteData;


    // hardcode fleet models for now.  
    // Should update this to derive fleet from imported route schedule
    $scope.fleetModels = [
        {'name': '737-400'},
        {'name': '737-700'},
        {'name': '737-800'},
        {'name': '737-900'}
    ];

    $scope.financialSummary = [
        {'name': 'Total Revenue', 'val': 4.65},
        {'name': 'PAX Revenue', 'val': 3.29},
        {'name': 'Operating Expense', 'val': 2.09},
        {'name': 'RPM', 'val': 24.42},
        {'name': 'ASM', 'val': 28.19},
        {'name': 'RASM', 'val': 0.117},
        {'name': 'CASM', 'val': 0.074}
    ]

  });


