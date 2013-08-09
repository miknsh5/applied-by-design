'use strict';
/*global d3:false */

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
      link: function postLink(scope, element) {
        var chartEl = d3.select(element[0]);

        routeMap.on('routeSelect', function(i){
          navService.selectPanelTab(1);

          var routeName = reportBuilder.getRouteNameFromId(i);
          routeService.activeRouteName = routeName;
          routeService.runRouteReport();

          scope.$apply();
        });

        scope.$watch(
          function() { return reportBuilder.getReport('routeReport'); }, function(newVal){
            routeMap.removeRoutes();
            chartEl.datum(newVal).call(routeMap);
          });

      }
    };

  });
