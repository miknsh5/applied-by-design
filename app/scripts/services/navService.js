'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    var activeTabId = 1;

    // initialized from reportBuilder service on intial data load
    // button status managed here
    var equipment = [];

    
    // Public API here
    return {
      setActiveTab: function(id){
        activeTabId = id;
      },
      getActiveTab: function(){
        return activeTabId;
      },

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
