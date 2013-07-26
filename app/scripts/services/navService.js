'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    var activeTabId = 0;

    // initialized from reportBuilder service on intial data load
    // button status managed here
    var equipment = [];

    
    // Public API here
    return {
      setActiveTab: function(id){
        activeTabId = id;
        // console.log('selected!')
        // angular.forEach(dashboardTabs, function(tab, i){
          // loop through each of the tabs, set to true
          // set the selected tab active state to 'true'
          // set the other tab active states to 'false'
          // dashboardTabs[i].active = (i == id) ? true : false;
        // });
      },
      getActiveTab: function(){
        return activeTabId;
      },

      // getTabState: function(id){
        // return dashboardTabs[id].active;
      // },
      initializeEquipment: function(equip){
        equipment = equip;
      },
      toggleEquipment: function(id) {
        equipment[id].active = !equipment[id].active;
      },
      isEquipActive: function(id, test) {
        return equipment[id].active;
      },
      getEquipment: function(){
        return equipment;
      }
    };
  });
