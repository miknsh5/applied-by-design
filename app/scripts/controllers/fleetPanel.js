'use strict';

angular.module('appliedByDesignApp')
  .controller('FleetPanelCtrl', function ($scope, navService) {

  $scope.activeFleetModel = navService.activeFleetModel;
  $scope.fleet            = navService.equipment;
  $scope.fleetServices    = $scope.fleet[$scope.activeFleetModel].details;

  $scope.selectModel = function(id){
    $scope.activeFleetModel = navService.selectFleetModel(id);
    $scope.fleetServices = $scope.fleet[$scope.activeFleetModel].details;
  };

  $scope.toggleService = function(id){
    $scope.fleet = navService.toggleFleetService(id);
  };



});
