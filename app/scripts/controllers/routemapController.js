'use strict';

angular.module('appliedByDesignApp')
  .controller('RoutemapCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.mapWidth = 1200;
    $scope.mapHeight = 700;

	$scope.fleetModels = [
		{'name': '737-400'},
		{'name': '737-700'},
		{'name': '737-800'},
		{'name': '737-900'}
	];



  });
