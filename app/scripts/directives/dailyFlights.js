'use strict';

angular.module('appliedByDesignApp')
  .directive('dailyFlights', function () {
    return {
      // template: '<div class="frequency-bar"></div>',
      restrict: 'E',
      scope:{
        numFlights: '='
      },
      link: function postLink(scope, element) {

        scope.$watch('numFlights', function(newData){
          // clear the existing flight bars
          element.children().remove();

          // element.text('this is the dailyFlights directive');
          for (var i = 0; i < newData; i++){
            element.append('<div class="frequency-bar">&nbsp</div>');
          }

        });
      }
    };
  });
