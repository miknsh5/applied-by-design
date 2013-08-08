'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope, reportBuilder, navService) {

    // set the dimensions of main SVG canvas
    $scope.mapWidth = 1800;
    $scope.mapHeight = 1200;

    // $scope.activeTab = navService.getActiveTab();
    $scope.activeTab = navService.activeTab;
    $scope.showReport = navService.showReport;

    $scope.equipment = reportBuilder.generateEquipment();
    $scope.routeReport = reportBuilder.buildRoutes();
    $scope.hoveredRoute = [];
    
    // build initial set of financial reports. This should only need to be done once unless 
    // changes are made to add new flights or reconfigure services.
    reportBuilder.buildFinancialReport(true);
    
    // recalculate the dashboard panel position based on hide/show state
    $scope.panelStyle = function(){
      var offset = -250;
      var b = (navService.showPanel) ? 0 : offset;

      return {
        bottom: b + 'px'
      };
    };

    // recalculate the dashboard panel position based on hide/show state
    $scope.equipPanelStyle = function(){
      var offset = -640;
      var r = (navService.showEquipPanel) ? 0 : offset;

      return {
        right: r + 'px'
      };
    };

    // recalculate the report position based on hide/show state
    $scope.reportStyle = function(){
      var offset = -1200;
      var t = (navService.showReport) ? 65 : offset;

      return { top: t + 'px' };
    };

    // watch for any changes to the aircraft toggle buttons and update
    // routes whenever there's a change.
    $scope.$watch(function(){return navService.equipment;}, function(newVal){
      $scope.equipment = newVal;
      $scope.routeReport = reportBuilder.buildRoutes();
    }, true);

    // $scope.$watch(function(){return navService.getActiveTab();}, function(newData){
    //   $scope.activeTab = newData;
    // });
    $scope.activeTab = navService.activeTab;

    $scope.setActiveTab = function(id){
      navService.setActiveTab(id);
    };

    $scope.toggleModel = function(id){
      navService.toggleEquipment(id);
    };

    // bind panel toggle button from view to service
    $scope.togglePanelState = navService.togglePanel;
    $scope.toggleEquipPanel = navService.toggleEquipPanel;


    $scope.toggleReport = function(){
      $scope.showReport = navService.toggleReport();
    };

  });


