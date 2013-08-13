'use strict';

angular.module('appliedByDesignApp')
  .directive('bulletChart', function () {

    var margin = {top: 0, right: 40, bottom: 20, left: 20},
        width = 530 - margin.left - margin.right,
        height = 40 - margin.top - margin.bottom;

    var chart = d3.bullet()
        .width(width)
        .height(height);

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


        var svg;

        scope.$watch('data', function(data){
          console.log('OK - new data in bullet refresh')
          clearCharts();
            
            svg = d3.select(element[0]).selectAll("svg");


              svg.data(data)
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

        });

        

      }


    };
        function clearCharts() {
          d3.select('bullet-chart').selectAll('svg').remove();
        }



  });
