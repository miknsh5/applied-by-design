'use strict';

angular.module('appliedByDesignApp')
  .controller('OperationsPanelCtrl', function ($scope, navService, fleetModel, frequencyService) {
    
    // $scope.navService = navService;
    $scope.fleetModel = fleetModel;
    $scope.frequencyService = frequencyService;


  });
