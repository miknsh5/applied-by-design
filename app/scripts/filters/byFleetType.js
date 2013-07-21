'use strict';

angular.module('appliedByDesignApp')
  .filter('byFleetType', function () {
    return function (input, filters) {
      //expect filters to be an array of strings to filter the data model by

      var output = [];

      angular.forEach(filters, function(filter){
      	console.log('filter on:' + filter);

	      angular.forEach(input, function(item, key){
	      	if (item.flts.length > 0 && item.flts[0].Equipment.Type === filter){
	      		output.push(item);
	      	}
	      });

			});

      return output;

    };
  });
