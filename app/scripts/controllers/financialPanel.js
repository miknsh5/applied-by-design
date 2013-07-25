'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, navService, fleetModel, financialData) {
    
    // $scope.navService = navService;
    $scope.fleetModel = fleetModel;
    $scope.financialData = financialData;


    fleetModel.getReport();
    $scope.financialData = fleetModel.getData('financialReport');

  });
