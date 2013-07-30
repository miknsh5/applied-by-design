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

	$scope.toggleService = function(id){
		var state = navService.setServiceState(id);
		$scope.fleet = navService.getEquipment();
	}





	// chart example
	$scope.options = {width: 200, height: 150, 'bar':'aaa'};
	$scope.data = [1,2,3,4];
	$scope.hovered = function(d){
		$scope.barValue = d;
		// $scope.$apply();
	}
	$scope.barValue = 'None';

	$scope.update = function(d, i){ 
		$scope.data = randomData(); 
	}

	function randomData(){
	    return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
	}

  });
