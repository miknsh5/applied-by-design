d3.custom = {};

d3.custom.barChart = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 200,
        height = 200,
        ease = 'cubic-in-out';
    var svg, duration = 500;

    var dispatch = d3.dispatch('customHover', 'statechange');
    function exports(_selection) {
        _selection.each(function(_data) {

            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom,
                radius = Math.min(chartW, chartH) / 2;

            var arc = d3.svg.arc()
                .innerRadius(radius - 40)
                .outerRadius(radius - 10);
            
            var groups = ['734', '735', '777', '756'];

            var color = d3.scale.ordinal()
                .domain(groups)
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            
            var pie = d3.layout.pie()
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

            var path = svg.datum(_data)
                .selectAll("path")
                  .data(pie)
                .enter().append("path")
                  .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                  .attr("d", arc)
                  .on('mouseover', dispatch.customHover)  

            // dispatch.on("statechange", function(d) {
            //   path.data(pie)
            //     .transition()
            //     .attrTween('d', function(d){
            //       var interpolate = d3.interpolate(this._current, d);
            //       this._current = interpolate(0);
            //       return function(t){
            //         return arc(interpolate(t));
            //       };
            //     });

            // });

            // dispatch.statechange('hey');
            duration = 500;

        });
    }
    // exports.width = function(_x) {
    //     if (!arguments.length) return width;
    //     width = parseInt(_x);
    //     return this;
    // };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    // exports.gap = function(_x) {
    //     if (!arguments.length) return gap;
    //     gap = _x;
    //     return this;
    // };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};