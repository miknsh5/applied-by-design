'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, reportBuilder, navService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1800;
    $scope.mapHeight = 1200;

    $scope.activeTab = navService.getActiveTab();
    $scope.showPanel = navService.getPanelState();
    $scope.showEquipPanel = navService.toggleEquipPanel();
    $scope.showReport = navService.toggleReport();

    $scope.equipment = reportBuilder.generateEquipment();
    $scope.routeReport = reportBuilder.buildRoutes();
    $scope.hoveredRoute = [];

    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
      var offset = -250;
      // var b = ($scope.showPanel) ? 0 : offset;
      var b = (navService.getPanelState()) ? 0 : offset;

      // console.log('move to:' + b)
      return {
        bottom: b + 'px'
      };
    };

    // recalculate the report position based on hide/show state
    $scope.reportStyle = function(){
      var offset = -1200;
      // var b = ($scope.showPanel) ? 0 : offset;
      var t = (navService.getReportState()) ? 65 : offset;

      // console.log('move to:' + b)
      return { top: t + 'px' };
    };

    // watch for any changes to the aircraft toggle buttons and update
    // routes whenever there's a change.
    $scope.$watch(function(){return navService.getEquipment();}, function(newVal){
      $scope.equipment = newVal;
      $scope.routeReport = reportBuilder.buildRoutes();
    }, true);

    $scope.$watch(function(){return navService.getActiveTab();}, function(newData){
      $scope.activeTab = newData;
    });

    $scope.setActiveTab = function(id){
      navService.setActiveTab(id);
    };

    $scope.toggleModel = function(id){
      navService.toggleEquipment(id);
    };

    $scope.togglePanelState = function(){
      $scope.showPanel = navService.togglePanelState();
    };

    $scope.toggleEquipPanel = function(){
      $scope.showEquipPanel = navService.toggleEquipPanel();
    };

    $scope.toggleReport = function(){
      $scope.showReport = navService.toggleReport();
    };

  });


