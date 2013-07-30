'use strict';

angular.module('appliedByDesignApp')
  .directive('chartExample', function () {

    var chart = d3.custom.barChart();

    return {
      template: '<div class="chart"></div>',
      replace: true,
      restrict: 'E',
      scope:{
        height: '=',
        data: '=',
        hovered: '&hovered'
      },
      link: function postLink(scope, element, attrs) {
        var chartEl = d3.select(element[0]);
        chart.on('customHover', function(d, i){
            scope.hovered({args:d});
        });

        scope.$watch('data', function(newVal, oldVal){
            chartEl.datum(newVal).call(chart);
        });


      }
    };





  });
