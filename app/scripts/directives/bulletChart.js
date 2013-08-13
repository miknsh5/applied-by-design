'use strict';

angular.module('appliedByDesignApp')
  .directive('bulletChart', function () {
    return {
      restrict: 'E',
      scope:{
        data: '='
      },
      link: function postLink(scope, element, attrs) {


        // var data = [
        //   {
        //     "title":"Revenue",
        //     "subtitle":"US$, in thousands",
        //     "ranges":[150,225,300],
        //     "measures":[220,270],
        //     "markers":[250, 260]
        //   },
        //   {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
        //   {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
        //   {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
        //   {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
        // ];

        var margin = {top: 0, right: 40, bottom: 20, left: 20},
            width = 530 - margin.left - margin.right,
            height = 40 - margin.top - margin.bottom;

        var chart = d3.bullet()
            .width(width)
            .height(height);


        scope.$watch('data', function(data){

          if(!data){ console.log('!!! NO DATA !!!'); return; }

          console.log('OK - new data in bullet refresh')
          var svg = d3.select(element[0]).selectAll("svg")
              .data(data)
            .enter().append("svg")
              .attr("class", "bullet")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(chart);

          var title = svg.append("g")
              .style("text-anchor", "end")
              .attr("transform", "translate(-6," + height / 2 + ")");

          title.append("text")
              .attr("class", "title")
              .text(function(d) { return d.title; });

          title.append("text")
              .attr("class", "subtitle")
              .attr("dy", "1em")
              .text(function(d) { return d.subtitle; });

          })

            // d3.selectAll("button").on("click", function() {
            //   svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
            // });
          
        // })
        // function randomize(d) {
        //   console.log('random')
        //   if (!d.randomizer) d.randomizer = randomizer(d);
        //   d.ranges = d.ranges.map(d.randomizer);
        //   d.markers = d.markers.map(d.randomizer);
        //   d.measures = d.measures.map(d.randomizer);
        //   return d;
        // }

        // function randomizer(d) {
        //   var k = d3.max(d.ranges) * .2;
        //   return function(d) {
        //     return Math.max(0, d + k * (Math.random() - .5));
        //   };
        // }



      }

    };



  });
