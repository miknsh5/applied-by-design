'use strict';

angular.module('appliedByDesignApp')
  .directive('worldMap', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        width:"=",
        height:"="
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the worldMap directive');

        var width = scope.width;
        var height = scope.height;
        var centered;

        // adapted from http://bl.ocks.org/mbostock/3757132
        var projection = d3.geo.mercator()
            .scale((width + 1) / 2 / Math.PI)
            .translate([width / 2, height / 2])
            .precision(.1);

        var path = d3.geo.path()
            .projection(projection)
            .pointRadius(function(d){ return [d.radius];});
        // var airport = d3.geo.circle(),
            // route = d3.geo.

        var airportData = {'type': 'LineString', 'coordinates': [[-0.46, 51.5], [-73.8, 40.6]]}

        // render the world map
        // element[0] references the containing directive DOM element
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);


        var g = svg.append('g');

        d3.json("/images/world-50m.json", function(error, world) {
          g.insert("path")
              .datum(topojson.feature(world, world.objects.land))
              .attr("class", "land")
              .attr("d", path)
              .on("click", clicked);

          g.insert("path")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);

          d3.json('/images/AS-flightLegs.json', function(error, flightLegs){

            g.selectAll('route').data(flightLegs)
                .enter()
                    .append('path')
                    .datum(function(d){
                      return{'type': 'LineString', 'coordinates': [[d.origin.longitude_deg, d.origin.latitude_deg], [d.destination.longitude_deg, d.destination.latitude_deg]]};
                    })
                    .attr('class', 'route')
                    .attr('fill', 'none')
                    .attr('stroke', 'blue')
                    .attr('stroke-width', 3)
                    .attr('d', path);
            });


          })
          
        function clicked(d) {
          var x, y, k;

          if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
          } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
          }

          g.selectAll("path")
              .classed("route", centered && function(d) { return d === centered; });

          g.transition()
              .duration(750)
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1.5 / k + "px");
        }

         


      }

    };
  });
