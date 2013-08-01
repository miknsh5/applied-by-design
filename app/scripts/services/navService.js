'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    var activeTabId = 0;

    // initialized from reportBuilder service on intial data load
    // button status managed here
    var equipment = [];
    var activeFleetModel = 0; //fleet model selected in the fleet panel
    
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
      getEquipment: function(){
        return equipment;
      },
      setServiceState: function(id){
        var state = equipment[activeFleetModel].services[id].val
        equipment[activeFleetModel].services[id].val = !state;
        return !state;
      },
      selectFleetModel: function(id){
        activeFleetModel = id;
        return activeFleetModel;
      }
    };
  });
