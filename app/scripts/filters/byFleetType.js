'use strict';

angular.module('appliedByDesignApp')
  .filter('byFleetType', function () {
    return function (input) {
      return 'byFleetType filter: ' + input;
    };
  });
