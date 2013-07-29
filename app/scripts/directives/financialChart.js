'use strict';
/*global d3:false */

angular.module('appliedByDesignApp')
  .directive('financialChart', function (financialReports) {

    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        
      // http://bl.ocks.org/biovisualize/5372077
        
        scope.$watch('data', function(newVal, oldVal){
          svg.datum(newVal).call(pie);
          console.log('Data Changed!!!!!!!!!!')
        });

        var width = scope.width,
            height = scope.height,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();

        var pie = d3.layout.pie()
            .value(function(d){ return d.val })
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius - 10);

        var svg = d3.select(element[0])
            .append('svg')
              .data([scope.data])
              // .data([data])
              .attr('width', width)
              .attr('height', height)
            .append('g')                //holds the pie chart
              .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

        var arcs = svg.selectAll('g.slice')
              .data(pie)
              .enter()
                .append('g')
                  .attr('class', 'slice');

            arcs.append("path")
                    .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                    .attr("d", arc);  

        





      }
    };
  });
