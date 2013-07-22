'use strict';

angular.module('appliedByDesignApp')
  .filter('byFleetType', function () {
    return function (input, filters) {
      //expect filters to be an array of strings to filter the data model by

      var output = [];

      angular.forEach(filters, function(filter){
      	// console.log('filter on:' + filter);

	      angular.forEach(input, function(item, key){
	      	if (item.flts.length > 0 && item.flts[0].Equipment.Type === filter){
	      		//should loop through each flight in each route to check aircraft assigned to 
	      		// more than just the first flight. (currently assumes the same aircraft type is assigned
	      		// to all flights in a route (based on the first aircraft assignment))
	      		output.push(item);
	      	}
	      });

		});

      return output;

    };
  });
