'use strict';
/*global d3:false */
/*global topojson:false */

angular.module('appliedByDesignApp')
  .directive('worldMap', function (fleetModel, navService) {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '='
      },
      link: function postLink(scope, element) {


        var width = scope.width,
            height = scope.height,
            blue = d3.rgb(48,128,178),
            orange = d3.rgb(241,90,36),
            activePath,
            centered;

        // adapted from http://bl.ocks.org/mbostock/3757132
        var projection = d3.geo.mercator()
            .scale((width + 1) / 2 / Math.PI)
            .translate([width / 2, height / 2])
            .precision(0.1);

        var path = d3.geo.path()
            .projection(projection)
            .pointRadius(function(d){ return [d.radius];});


        var zoom = d3.behavior.zoom()
            .translate(projection.translate())
            .scale(projection.scale())
            .scaleExtent([(width + 1) / 2 / Math.PI, height * 10]) // ~ 190 to 1000
            .on("zoom", zoomed);

        // render the world map
        // element[0] references the containing directive DOM element
        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .call(zoom);

        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height)
            .on("click", reset);

        var map = svg.append('g')
            .attr('class', 'map')


        var network = svg.append('g')
            .attr('class', 'routes');


        //load the map data
        d3.json('/images/world-50m.json', function(error, world) {
          map.append('path')
              .datum(topojson.feature(world, world.objects.land))
              .attr('class', 'land')
              .attr('d', path);
              // .on('click', clicked);

          map.append('path')
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr('class', 'boundary')
              .attr('d', path);

        });


        function zoomed() {
          projection
            .translate(d3.event.translate)
            .scale(d3.event.scale);

          svg.selectAll("path").attr("d", path);
        }


        // whenever the vound data structure changes, update the route map
        // this will generally mean that the routes have been down selected with 
        // the fleet model filters.
        // scope.$watch('fleetRouteData', function(newData){
        
        // scope.$watch(function() { return 1 }, function(newData){
        scope.$watch(function() { 
            // watch for any changes to the routeReports object
            return fleetModel.getRouteReport()
          }, function(newData){

          // if (typeof(newData[0]) == 'undefined') { console.log('no cityPair data!'); return}
          // if (typeof(newData[1]) == 'undefined') { console.log('no airport data!'); return}

          console.log('updating routes');

          // using the "datum" feature to assign data to a path element does not provide
          // the exit() and update() virtualization methods.  Need to either figure out how
          // to properly generate the route paths without using "datum", or rely on this 
          // approach of clearing all of the routes and regenerating the entire network
          // every time the data changes.
          network.selectAll('*').remove();


          network.selectAll('route')
              .data(newData)
              .enter()
                .append('g')
                  .attr('class', 'route')
                .append('path')
                  .datum(function(d){
                    return{'type': 'LineString', 'coordinates': [[d.Olon, d.Olat], [d.Dlon, d.Dlat]]};
                  })
                  .attr('class', 'route')
                  .attr('fill', 'none')
                  .attr('stroke', blue)
                  .attr('stroke-width', 2)
                  .style('opacity', 0)
                  .attr('d', path)
                    .on('mouseover', highlight(blue, 'over'))
                    .on('mouseout', highlight(blue))
                    .on('click', scope.selectRoute(0.2, orange))
                .transition()
                  .duration(500)
                  .style('opacity', 1);

        }, true); //setting 'true' tells angular to watch for exact data changes (i.e. nested data can trigger event)

        function reset(){
            network.selectAll('.route path')
              .style('opacity', 1)
              .attr('stroke', blue)
              .attr('stroke-width', 2);
        }
        scope.selectRoute = function(opacity, color) {


          return function(g, i_clicked){

            activePath = i_clicked;
            

            network.selectAll('.route path')
              .filter(function(d,i) { return i_clicked != i})
              .style('opacity', opacity)
              .attr('stroke', blue)
              .attr('stroke-width', 2);

            d3.select(this)
              .attr('stroke-width', 4)
              .attr('stroke', color);
          }

        }

        function highlight(color, type) {
          return function(d, i){
            
            if (type == 'over' || i == activePath) {
              d3.select(this)
              .attr('stroke', orange)
              .style('opacity', 1)
            } else {
              d3.select(this)
              .attr('stroke', color)
              .style('opacity', 0.2);
            }
            
          }
        }


      }

    };
  });
