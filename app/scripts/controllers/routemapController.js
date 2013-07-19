'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, fleetRouteData) {
    
    // load the data with route resolve function in app.js, don't load page until data is ready
    // this fixes the issue with async directive data binding
    $scope.fleetRouteData = fleetRouteData;

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1200;
    $scope.mapHeight = 700;


    // hardcode fleet models for now.  
    // Should update this to derive fleet from imported route schedule
    $scope.fleetModels = [
        {'name': '737-400'},
        {'name': '737-700'},
        {'name': '737-800'},
        {'name': '737-900'}
    ];

  });


