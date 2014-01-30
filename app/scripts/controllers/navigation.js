// 'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('NavigationCtrl', function ($scope, $state) {

  	$scope.$state = $state;

  // $scope.gotoTop = function(){
  //   $location.hash('top');
  //   $anchorScroll();
  //   console.log('comment');
  // }

});
