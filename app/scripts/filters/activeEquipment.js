'use strict';

angular.module('appliedByDesignApp')
  .filter('activeEquipment', function () {
    return function (input) {
      // filter should return an array of strings corresponding to 
      // the active fleet model btns - e.g. ['734', '73Q']
      
      var output = [];

      // map long model type names to shortnames
      var dict = {
        '737-400':       '734',
        '737-400 Combi': '73Q',
        '737-800':       '738',
        '737-700':       '73G',
        '737-900':       '739'
      };

      angular.forEach(input, function(item, key){

        if (item.active){
            output.push(dict[item.name]);
        }
      });

      return output;

    };
  });
