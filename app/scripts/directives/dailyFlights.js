'use strict';

angular.module('appliedByDesignApp')
  .directive('dailyFlights', function () {
    return {
      // template: '<div class="frequency-bar"></div>',
      restrict: 'E',
      scope:{
      	numFlights: '='
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the dailyFlights directive');
        for (var i = 0; i < scope.numFlights; i++){
        	element.append('<div class="frequency-bar">&nbsp</div>')
        }
      }
    };
  });
