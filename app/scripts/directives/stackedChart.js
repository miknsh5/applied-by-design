'use strict';

angular.module('appliedByDesignApp')
  .directive('stackedChart', function () {

    return {
      template: '<div class="chart"></div>',
      replace: true,
      restrict: 'E',
      scope:{
        data: '='
      },
      link: function postLink(scope, element, attrs) {

        var forecastData = [
              {'year': 2013, 'revA': 100, 'revB': 20},
              {'year': 2014, 'revA': 130, 'revB': 15},
              {'year': 2015, 'revA': 125, 'revB': 30},
              {'year': 2016, 'revA': 125, 'revB': 30},
              {'year': 2017, 'revA': 125, 'revB': 30}
        ];


        var w = 300,
            h = 200,
            p = [20, 50, 30, 20],
            x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]], .20),
            y = d3.scale.linear().range([0, h - p[0] - p[2]]),
            z = d3.scale.ordinal().range([d3.rgb(200,200,200), d3.rgb(48,128,178)]);

        var svg = d3.select(element[0]).append("svg:svg")
            .attr("width", w)
            .attr("height", h)
          .append("svg:g")
            .attr("transform", "translate(" + p[3] + "," + (h - p[2]) + ")");
         
        // Transpose the data into layers by cause.
        var revenues = d3.layout.stack()(["revA", "revB"].map(function(type) {
          return forecastData.map(function(d) {
            return {x: d.year, y: d[type]};
          });
        }));

        // Compute the x-domain (by year) and y-domain (by top).
        x.domain(revenues[0].map(function(d) { return d.x; }));
        y.domain([0, d3.max(revenues[revenues.length - 1], function(d) { return d.y0 + d.y; })]);

        // Add a group for each cause.
        var year = svg.selectAll("g.year")
            .data(revenues)
          .enter().append("svg:g")
            .attr("class", "year")
            .style("fill", function(d, i) { return z(i); });
            // .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });
        
        // Add a rect for each date.
        var rect = year.selectAll("rect")
            .data(Object)
          .enter().append("svg:rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return -y(d.y0) - y(d.y); })
            .attr("height", function(d) { return y(d.y); })
            .attr("width", x.rangeBand());
        

      }
    };
  });
