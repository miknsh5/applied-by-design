'use strict';

angular.module('appliedByDesignApp')
  .directive('barChart', function () {

    // var chart = d3.custom.donutChart();

    return {
      template: '<div class="chart"></div>',
      replace: true,
      restrict: 'E',
      scope:{
        data: '='
      },
      link: function postLink(scope) {

        var margin = {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        };

        var width = scope.width || 300;
        var height = scope.height || 1020;

        // add margin
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;


        // watch for udpates to the data
        scope.$watch('data', function(data){
          console.log('---new data for chart---');

          // data updated, make sure it's not empty
          if (data) {


          } else {
            // remove chart if data is empty
            console.log('no data!');

            // svg.selectAll('path').remove();
            // labels.selectAll('line').remove();
            // labels.selectAll('text.value').remove();
            // labels.selectAll('text.units').remove();
          }


        });

      }


    };
  });
