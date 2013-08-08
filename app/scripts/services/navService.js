'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    var activeTabId = 0;

    var navStatus = {};
    navStatus.showPanel       = true;
    navStatus.showEquipPanel  = true;
    navStatus.showReport      = true;
    navStatus.activeTab       = 0;
    navStatus.equipment       = [];
    
    navStatus.togglePanel = function(){
      navStatus.showPanel = !navStatus.showPanel;
      return navStatus.showPanel;
    }
    
    navStatus.toggleEquipPanel = function(){
      navStatus.showEquipPanel = !navStatus.showEquipPanel;
      return navStatus.showEquipPanel;
    }
    // var navStatus = {
    //   'showPanel': true,
    //   'showEquipPanel': false,
    //   'showReport': true
    // }

    return navStatus;

    // // initialized from reportBuilder service on intial data load
    // // button status managed here
    // var equipment = [],
    //     activeFleetModel = 0, //fleet model selected in the fleet panel
    //     showPanel = true,
    //     showEquipPanel = false,
    //     showReport = true;

    // // Public API here
    // return {

    //   // dashbaord panel navigation controls
    //   // -----------------------------------
    //   getPanelState: function(){
    //     return showPanel;
    //   },
    //   togglePanelState: function(){
    //     showPanel = !showPanel;
    //     return showPanel;
    //   },
    //   setActiveTab: function(id){
    //     activeTabId = id;
    //   },
    //   getActiveTab: function(){
    //     return activeTabId;
    //   },

    //   // report navigation controls
    //   // -----------------------------------
    //   toggleReport: function(){
    //     showReport = !showReport;
    //     return showReport;
    //   },
    //   getReportState: function(){
    //     return showReport;
    //   },


    //   // equipment filter controls
    //   // -----------------------------------
    //   toggleEquipPanel: function(){
    //     showEquipPanel = !showEquipPanel;
    //     return showEquipPanel;
    //   },
    //   initializeEquipment: function(equip){
    //     equipment = equip;
    //   },
    //   toggleEquipment: function(id) {
    //     equipment[id].active = !equipment[id].active;
    //   },
    //   getEquipment: function(){
    //     return equipment;
    //   },
    //   setServiceState: function(id){
    //     var state = equipment[activeFleetModel].services[id].val;
    //     equipment[activeFleetModel].services[id].val = !state;
    //     return !state;
    //   },
    //   selectFleetModel: function(id){
    //     activeFleetModel = id;
    //     return activeFleetModel;
    //   }

    // };
  });
