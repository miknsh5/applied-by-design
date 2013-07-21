'use strict';

angular.module('appliedByDesignApp')
  .factory('financialData', function () {

    var financialSummary = [
        {'name': 'Total Revenue', 'val': 4.65, 'currency': true},
        {'name': 'PAX Revenue', 'val': 3.29, 'currency': true},
        {'name': 'Operating Expense', 'val': 2.09, 'currency': true},
        {'name': 'RPM', 'val': 24.42, 'currency': false},
        {'name': 'ASM', 'val': 28.19, 'currency': false},
        {'name': 'RASM', 'val': 0.117, 'currency': false},
        {'name': 'CASM', 'val': 0.074, 'currency': false}
      ];

    // initialize selection to first summary
    var activeChart = 0;

    // Public API here
    return {

      getTotals: function() {
        return financialSummary;
      },

      getActive: function() {
        return financialSummary[activeChart];
      },

      activeId: function() {
        return activeChart;
      },

      select: function(id) {
        activeChart = id;
      }
    };
  });
