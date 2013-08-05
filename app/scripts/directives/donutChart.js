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
        
        var margin = {top: 20, right: 50, bottom: 20, left: 40},
            width = 250,
            height = 220,
            ease = 'cubic-in-out';
        
        var svg, 
            arc,
            arcs,
            pie,
            color,
            labels,
            legend,
            duration = 500;
        
        var chartW = width - margin.left - margin.right,
            chartH = height - margin.top - margin.bottom,
            radius = Math.min(chartW, chartH) / 2;

        svg = d3.select(element[0])
            .append('svg')
              .attr('width', width)
              .attr('height', height)

        // group for the pie slices (arcs)
        arcs = svg.append('g')
            .attr({transform: 'translate(' + chartW/2 + ',' + 100 + ')'});

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

        labels = svg.append('g')
          .classed('labels', true)
            .attr({transform: 'translate(' + (width-100) + ',' + 40 + ')'});

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

            // remove arcs not in the dataset
            path.exit().remove();
            labels.selectAll('g').remove();


            labels.selectAll('g')
              .data(pieData)
                .enter()
                .append('g')
                .each(function(d, i) {
                  var g = d3.select(this);
                  g.append("rect")
                    .attr("x", 50)
                    .attr("y", i*25)
                    .attr("width", 10)
                    .attr("height", 12)
                    .style("fill", function() { return color(i); });
                  
                  g.append("text")
                    .attr("x", 65)
                    .attr("y", i * 25 + 12)
                    .attr("height",30)
                    .attr("width",100)
                    .style("fill", function() { return color(i); })
                    .text(function(d){
                      return d.data.equipment;
                    });
                })

            

            // legend = labels.selectAll('key')
            //   .data(data)
            //   .enter()
            //     .append('text')
            //     .text(function(d){
            //       return d.equipment;
            //     });

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
