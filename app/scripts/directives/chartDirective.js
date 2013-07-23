'use strict';
/*global d3:false */

angular.module('appliedByDesignApp')
  .directive('chartDirective', function (fleetModel) {
    return {
      restrict: 'E',
      scope: {
      	width: '@',
      	height: '@'
      },
      link: function postLink(scope, element, attrs) {

        var width = scope.width;
        var height = scope.height;


      }
    };
  });
