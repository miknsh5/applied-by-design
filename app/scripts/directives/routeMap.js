'use strict';
/*global d3:false */
/*global topojson:false */

angular.module('appliedByDesignApp')
  .directive('routeMap', function (reportBuilder, navService, routeService) {

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
            // scope.hovered({args:i});
        });
        
        routeMap.on('routeSelect', function(i){
            navService.setActiveTab(1);

            var routeName = reportBuilder.getRouteNameFromId(i);
            routeService.setActiveRouteName(routeName);

            scope.$apply();
        });

        scope.$watch(
          function() { return reportBuilder.getReport('routeReport') }, function(newVal, oldVal){
            routeMap.removeRoutes();
            chartEl.datum(newVal).call(routeMap);
          });

      }
    };

  });
