'use strict';

angular.module('appliedByDesignApp')
  .filter('findSize', function () {
    return function (input, filters) {
      //expect filters to be an array of strings to filter the data model by

      var output = [];
      var quant  = 0;

      angular.forEach(filters, function(filter){
      	//console.log('filter on:' + filter);

	    angular.forEach(input, function(item, key){

      	if (item.Size === filter){
	  		output = item;
	  		quant ++;
      	}
      });
	});
      if(quant>1)
      {
      	console.log('More than one findFleetType option')
      };
      return output;
    };
  });
