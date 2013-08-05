if (!d3.custom) { d3.custom = {};}

d3.custom.donutChart = function module() {
// custom d3 chart to be instantiated within an Angular directive
//  var chart = d3.custom.routemap

    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 240,
        height = 240,
        ease = 'cubic-in-out';
    var svg, 
        path,
        duration = 500;

        
    var dispatch = d3.dispatch('customHover', 'statechange');
    
    function exports(_selection) {
        _selection.each(function(_data) {

            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom,
                radius = Math.min(chartW, chartH) / 2;

            var arc = d3.svg.arc()
                .innerRadius(radius - 40)
                .outerRadius(radius - 10);
            
            var pie = d3.layout.pie()
                .value(function(d){ return d.val; })
                .sort(null);

            var color = d3.scale.category20();

            if (!svg) {
              svg = d3.select(this)
                    .append('svg')
                      .attr('width', chartW)
                      .attr('height', chartH)
                    .append('g')
                      .attr({transform: 'translate(' + chartW/2 + ',' + chartH/2 + ')'})
            }

            path = svg.datum(_data)
                .selectAll("path")
                  .data(pie)
                .enter().append("path")
                  .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                  .attr('d', arc)
                  .each(function(d){ this._current = d })



            duration = 500;

        });
    }

    exports.change = function() {
        pie.value(function(d){return d.val; });
        path = path.data(pie); //compute new angles
        path.transition().duration(1000).attrTween('d', arcTween); //redraw arcs
    }

    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t){
            return arc(i(t));
        };
    }

    exports.clearPie = function(){
      if (!svg){ return }
      svg.selectAll('*').remove();
    }

    d3.rebind(exports, dispatch, 'on');

    return exports;
};