'use strict';

angular.module('appliedByDesignApp')
  .controller('FinancialPanelCtrl', function ($scope, reportBuilder, navService, fleetModel, financialData) {
    
    // $scope.navService = navService;
    $scope.fleetModel = fleetModel;
    $scope.financialData = financialData;
    $scope.reportBuilder = reportBuilder;


    // fleetModel.getReport();
    // $scope.financialData = fleetModel.getData('financialReport');

  });
