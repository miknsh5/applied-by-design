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

        // adapted from http://bl.ocks.org/mbostock/3757132
        var projection = d3.geo.mercator()
            .scale((width + 1) / 2 / Math.PI)
            .translate([width / 2, height / 2])
            .precision(.1);

        var path = d3.geo.path()
            .projection(projection);

        // element[0] references the containing directive DOM element
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("/images/world-50m.json", function(error, world) {
          svg.insert("path")
              .datum(topojson.feature(world, world.objects.land))
              .attr("class", "land")
              .attr("d", path);

          svg.insert("path")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);
        });

        var cityPair = [
            {
                "longitude": -0.4619410038,
                "latitude": 51.4706001282
            },
            {
                "longitude": -73.7789,
                "latitude": 40.6398
            }
        ];
        // console.log(projection(testPt))
        // "latitude_deg": "51.4706001282",
        // "longitude_deg": "-0.4619410038",

        // add city dot at specified coordinates
        var city = svg.append('circle')
            .attr('cx', 100)
            .attr('cy', 200)
            .attr('r', 50)
            .attr('fill', 'blue')
            .attr('stroke', 'red')
            .attr('stroke-width', 2);



        var routeFunction = d3.svg.line()
            .x(function(d) {return projection([d.longitude, d.latitude])[0];})
            .y(function(d) {return projection([d.longitude, d.latitude])[1];})
            .interpolate('linear');

        var routes = svg.append('path')
                        .attr('d', routeFunction(cityPair))
                        .attr('stroke', 'blue')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');

        d3.select(self.frameElement).style("height", height + "px");


      }
    };
  });
