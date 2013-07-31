'use strict';
/*global d3:false */
/*global topojson:false */

angular.module('appliedByDesignApp')
  .directive('worldMap', function (reportBuilder, navService) {

    var routeMap = d3.custom.routeMap();

    return {

      template: '<div class="routemap"></div>',
      replace: true,
      restrict: 'E',
      scope:{
        hovered: '&hovered'
      },
      link: function postLink(scope, element, attrs) {
        var chartEl = d3.select(element[0]);
        routeMap.on('routeHover', function(d, i){
            scope.hovered({args:d});
            console.log(d)
        });

        scope.$watch(
          function() { return reportBuilder.getReport('routeReport') }, function(newVal, oldVal){
            chartEl.datum(newVal).call(routeMap);
            console.log('***** BUILD ROUTE MAP *****')
          });

      }
    };

  });
