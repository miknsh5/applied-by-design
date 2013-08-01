'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, reportBuilder, navService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1800;
    $scope.mapHeight = 1200;

    $scope.activeTab = navService.getActiveTab();

    $scope.equipment = reportBuilder.generateEquipment();
    $scope.routeReport = reportBuilder.buildRoutes();
    $scope.hoveredRoute = [];

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
    $scope.$watch(function(){return navService.getEquipment()}, function(newVal){
        $scope.equipment = newVal;
        $scope.routeReport = reportBuilder.buildRoutes();
    }, true);


    $scope.$watch(function(){return navService.getActiveTab()}, function(newData){
        $scope.activeTab = newData;
    })

    $scope.setActiveTab = function(id){
        navService.setActiveTab(id);
    }

    $scope.hovered = function(iRoute){
        // $scope.hoveredRoute = $scope.routeReport[iRoute];
        // $scope.$apply();
    }

    $scope.toggleModel = function(id){
        navService.toggleEquipment(id);
    }

  });


