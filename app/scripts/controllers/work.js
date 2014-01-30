'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('WorkCtrl', function ($rootScope, $scope, $state) {

  	// $scope.$state = $state;
  	if (window.innerWidth < 1100 ) {
    	$scope.vimeoWidth = window.innerWidth * 0.80 + 'px';
	} else {
		$scope.vimeoWidth = 800 + 'px';
	}

});







