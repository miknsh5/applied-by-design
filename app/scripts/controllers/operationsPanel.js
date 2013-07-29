'use strict';

angular.module('appliedByDesignApp')
  .controller('OperationsPanelCtrl', function ($scope, navService, routeService, financialReports) {
    

    $scope.selectDay = function(id) {
    	$scope.dotw = routeService.setActiveDay(id);
    }
    $scope.selectDay(0); //initialize selected day


    
  });
