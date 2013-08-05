'use strict';

angular.module('appliedByDesignApp')
  .directive('donutChart', function () {

    // var chart = d3.custom.donutChart();

    return {
      template: '<div class="chart"></div>',
      replace: true,
      restrict: 'E',
      scope:{
        data: '=',
        hovered: '&hovered'
      },
      link: function postLink(scope, element, attrs) {
        
        var margin = {top: 20, right: 20, bottom: 40, left: 40},
            width = 240,
            height = 240,
            ease = 'cubic-in-out';
        
        var svg, 
            arc,
            arcs,
            pie,
            color,
            duration = 500;
        
        var chartW = width - margin.left - margin.right,
            chartH = height - margin.top - margin.bottom,
            radius = Math.min(chartW, chartH) / 2;

        svg = d3.select(element[0])
            .append('svg')
              .attr('width', chartW)
              .attr('height', chartH)

        // group for the pie slices (arcs)
        arcs = svg.append('g')
            .attr({transform: 'translate(' + chartW/2 + ',' + chartH/2 + ')'});

        // arc generator
        arc = d3.svg.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius - 10);

        // calculate new pie slices from data
        pie = d3.layout.pie()
            .value(function(d){ return d.val; })
            .sort(null);

        // set colormap
        color = d3.scale.category20();

        // watch for udpates to the data
        scope.$watch('data', function(data){
          console.log('---new data for chart---')


          function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t){
                return arc(i(t));
            };
          }

          // data updated, make sure it's not empty
          if (data) {
            console.log('new data!')

            // calculate new pie slices
            var pieData = pie(data);

            // draw new donut chart
            var path = arcs.selectAll('path')
                .data(pieData);
                path.enter()
                  .append('path')
                    .attr('d', arc) // draw the pie slice
                    .attr('fill', function(d, i) { return color(i); })
                    .each(function(d) { this._current = d; });

            path.transition()
                .duration(duration)
                .attrTween('d', arcTween)
                .style('fill', function(d, i) { return color(i); });

          } else {
            // remove chart if data is empty
            console.log('no data!')
            svg.selectAll('path').remove();
            labels.selectAll('line').remove();
            labels.selectAll("text.value").remove();
            labels.selectAll("text.units").remove();
          }

          

        });

      }


    };
  });
