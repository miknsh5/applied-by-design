'use strict';

angular.module('appliedByDesignApp')
  .filter('byFleetType', function () {
    return function (input, modelType) {
      
      var filteredData = [];

      angular.forEach(input, function(item, key){
      	// console.log(item.flts[0] + '----' + key);


      	if (item.flts.length > 0 && item.flts[0].Equipment.Type === modelType){
      		filteredData.push(item);
      	}
      });

      return filteredData;

      // if (input.flts.length > 0 && input.flts[0].Equipment.Type === modelType) { return true;}

    };
  });
