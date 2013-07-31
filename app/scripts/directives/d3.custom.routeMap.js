if (!d3.custom) { d3.custom = {};}

d3.custom.routeMap = function module() {
// custom d3 chart to be instantiated within an Angular directive
//  var chart = d3.custom.routemap

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 1000,
      height = 800,
      blue = d3.rgb(48,128,178),
      orange = d3.rgb(241,90,36),
      activePath,
      centered;

  var svg, 
      map,
      network,
      duration = 500;

  var chartW = width - margin.left - margin.right,
      chartH = height - margin.top - margin.bottom


  // adapted from http://bl.ocks.org/mbostock/3757132
  var projection = d3.geo.mercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);

  var path = d3.geo.path()
      .projection(projection)
      .pointRadius(function(d){ return [d.radius];});

  var dispatch = d3.dispatch('routeHover', 'routeSelect');

  function exports(_selection){
    _selection.each(function(_data){



      var zoom = d3.behavior.zoom()
          .translate(projection.translate())
          .scale(projection.scale())
          .scaleExtent([(width + 1) / 2 / Math.PI, height * 10]) // ~ 190 to 1000
          .on("zoom", zoomed);

      // render the world map
      // element[0] references the containing directive DOM element
      if (!svg) {

        svg = d3.select(this) //selected element[0] when called from a directive.
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .call(zoom);
     
        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height)
            .on("click", reset); // background click clears the route selections

        map = svg.append('g')
            .attr('class', 'map')


        network = svg.append('g')
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
      }

      // using the "datum" feature to assign data to a path element does not provide
      // the exit() and update() virtualization methods.  Need to either figure out how
      // to properly generate the route paths without using "datum", or rely on this 
      // approach of clearing all of the routes and regenerating the entire network
      // every time the data changes.

      network.selectAll('route')
          .data(_data)
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
                .on('click', selectRoute(0.2, orange))
            .transition()
              .duration(500)
              .style('opacity', 1);


      function zoomed() {
        projection
          .translate(d3.event.translate)
          .scale(d3.event.scale);

        svg.selectAll("path").attr("d", path);
      }




      function reset(){
          activePath = null;
          network.selectAll('.route path')
            .style('opacity', 1)
            .attr('stroke', blue)
            .attr('stroke-width', 2);
      }

      function selectRoute(opacity, color) {

        return function(g, i_clicked){
          
          dispatch.routeSelect(g)

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
          
          dispatch.routeHover(d, i);

          if (type == 'over' || i == activePath) {
            d3.select(this)
            .attr('stroke', orange)
            .style('opacity', 1.0)
          } else if (activePath == null) {
            //no path selected, don't fade on mouseout
            d3.select(this)
            .attr('stroke', color)
            .style('opacity', 1.0);

          } else {
            d3.select(this)
            .attr('stroke', color)
            .style('opacity', 0.2);
          }
          
        }
      }


    });
  } 

  exports.removeRoutes = function(){
    if (!network){ return }
    network.selectAll('*').remove();
  }

  // make the event listeners accessible from the parent directive scope
  d3.rebind(exports, dispatch, 'on'); 

  // instantiating d3.custom.routeMap returns the routemap object
  return exports;
};



