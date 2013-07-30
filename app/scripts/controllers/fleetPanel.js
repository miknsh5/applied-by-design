'use strict';

angular.module('appliedByDesignApp')
  .controller('FleetPanelCtrl', function ($scope, navService, fleetModel) {
  	
	$scope.fleetModels = navService.getEquipment();
	$scope.activeFleetModel = 0;
	
	$scope.selectModel = function(id){
		$scope.activeFleetModel = navService.selectFleetModel(id);
	}
  });
