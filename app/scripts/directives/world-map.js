'use strict';

angular.module('appliedByDesignApp')
  .directive('worldMap', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        width:       "=",
        height:      "=",
        fleetRouteData:   "="
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

        // render the world map
        // element[0] references the containing directive DOM element
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);


        var map = svg.append('g');


        //load the map data
        d3.json("/images/world-50m.json", function(error, world) {
          map.insert("path")
              .datum(topojson.feature(world, world.objects.land))
              .attr("class", "land")
              .attr("d", path);
              // .on("click", clicked);

          map.insert("path")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);

        })


        scope.$watch('fleetRouteData', function(newData, oldData){

          console.log('updating routes')
          
          var routes = map.selectAll('route')
              .data(newData);

          routes.enter()
              .append('path')
              .datum(function(d){
                return{'type': 'LineString', 'coordinates': [[d.Olon, d.Olat], [d.Dlon, d.Dlat]]};
              })
              .attr('class', 'route')
              .attr('fill', 'none')
              .attr('stroke', 'blue')
              .attr('stroke-width', 3)
              .attr('d', path);

          routes.exit().remove()

        }, true);



      }

    };
  });
