'use strict';

angular.module('appliedByDesignApp')
  .filter('activeEquipment', function () {
    return function (input) {
      // filter should return an array of strings corresponding to 
      // the active fleet model btns - e.g. ['734', '73Q']

      var output = [];

      // map long model type names to shortnames
      var dict = {
        '737-400': '734',
        '737-700': '73Q',
        '737-800': '738',
        '737-900': '739'
      };

      angular.forEach(input, function(item){
        if (item.active){
          output.push(dict[item.name]);
        }
      });

      return output;

    };
  });
