'use strict';

angular.module('appliedByDesignApp')
  .filter('findByKey', function () {
  	    return function (input, filters, filterKey) {
  	      //expect filters to be an array of strings to filter the data model by

  	      var output = [];

  	      angular.forEach(filters, function(filter){
  	      	//console.log('filter on:' + filter);

  		      angular.forEach(input, function(item, key){

  		      	if (item[filterKey] === filter){
  		      		//should loop through each flight in each route to check aircraft assigned to 
  		      		// more than just the first flight. (currently assumes the same aircraft type is assigned
  		      		// to all flights in a route (based on the first aircraft assignment))
  		      		output = item;
  		      	}
  		      });

  			});

  	      return output;
    };
  });
