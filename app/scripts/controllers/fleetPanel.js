'use strict';

angular.module('appliedByDesignApp')
  .controller('FleetPanelCtrl', function ($scope, navService) {
  	
	$scope.activeFleetModel = 0;
	$scope.fleet = navService.getEquipment();
	$scope.fleetDetails = $scope.fleet[$scope.activeFleetModel].details;

	$scope.selectModel = function(id){
		$scope.activeFleetModel = navService.selectFleetModel(id);
		$scope.fleetDetails = $scope.fleet[$scope.activeFleetModel].details;

	}
  });
