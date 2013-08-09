'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, reportBuilder, navService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth  = 1800;
    $scope.mapHeight = 1200;

    $scope.equipment   = reportBuilder.generateEquipment();
    reportBuilder.buildRoutes();
    reportBuilder.buildFinancialReport(true);
    

    $scope.toggleModel = function(id){
      $scope.equipment   = navService.toggleEquipment(id);
      $scope.routeReport = reportBuilder.buildRoutes();
    };

    $scope.showPanel = function(){
      return navService.showPanel; 
    }

    // bind panel toggle button from view to service
    $scope.togglePanelState = navService.togglePanel; //returns new state
    $scope.toggleEquipPanel = navService.toggleEquipPanel;  //returns new state

    $scope.toggleReport = function(){
      $scope.showReport = navService.toggleReportPanel();
    };


    // Dashboard Panel Tab Navigation
    $scope.activeTab = navService.activeTab;
    $scope.selectTab = function(id){
      $scope.activeTab = navService.selectPanelTab(id);
    }

    // watch for changes to active tab in service when it's changed outside of this scope
    $scope.$watch(function(){ return navService.getActiveTab();}, function(newTabId){
      $scope.activeTab = newTabId;
    });


    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
      var offset = -250;
      var b = (navService.showPanel) ? 0 : offset;
      return {bottom: b + 'px'};
    };

    // recalculate the dashboard panel position based on hide/show state
    $scope.equipPanelStyle = function(){
      var offset = -200;
      var t = (navService.showEquipPanel) ? 0 : offset;
      return {top: t + 'px'};
    };

    // recalculate the report position based on hide/show state
    $scope.reportStyle = function(){
      var offset = -1200;
      var t = ($scope.showReport) ? 65 : offset;
      return {top: t + 'px' };
    };

  });


