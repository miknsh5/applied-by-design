'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    var dashboardTabs = [
      {'name': 'fin', 'active': true},
      {'name': 'ops', 'active': false},
      {'name': 'flt', 'active': false}
    ];

    // Public API here
    return {
      selectTab: function(id){
        console.log('selected!')
        angular.forEach(dashboardTabs, function(tab, i){
          // loop through each of the tabs, set to true
          // set the selected tab active state to 'true'
          // set the other tab active states to 'false'
          dashboardTabs[i].active = (i == id) ? true : false;
        });
      },
      tabState: function(id){
        return dashboardTabs[id].active;
      }
    };
  });
