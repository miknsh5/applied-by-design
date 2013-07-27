'use strict';
/*global d3:false */

angular.module('appliedByDesignApp')
  .directive('financialChart', function (financialReports) {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '='
      },
      link: function postLink(scope, element, attrs) {

        var width = scope.width,
            height = scope.height,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();

        var pie = d3.layout.pie()
                   .sort(null);

        var arc = d3.svg.arc()
          .innerRadius(radius - 50)
          .outerRadius(radius - 10);

        var svg = d3.select(element[0]).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

        scope.$watch(function() {
          return financialReports.getActiveReport()}, 
          function(newData){

            var path = svg.selectAll('path')
            .data(pie(newData))
              .enter().append('path')
                .attr('fill', function(d,i){ return color(i); })
                .attr('d', arc);
        
          }
        )





      }
    };
  });
