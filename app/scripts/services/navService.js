'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    // var activeTabId = 0;

    var navStatus = {};
    navStatus.showPanel       = true;
    navStatus.showEquipPanel  = true;
    navStatus.showReport      = false;
    navStatus.activeTab       = 0;
    navStatus.equipment       = [];
    navStatus.activeFleetModel = 0;
    
    navStatus.togglePanel = function(){
      navStatus.showPanel = !navStatus.showPanel;
      return navStatus.showPanel;
    }
    
    navStatus.toggleEquipPanel = function(){
      navStatus.showEquipPanel = !navStatus.showEquipPanel;
      return navStatus.showEquipPanel;
    }   
     
    navStatus.toggleReportPanel = function(){
      navStatus.showReport = !navStatus.showReport;
      return navStatus.showReport;
    }

    navStatus.selectPanelTab = function(id){
      navStatus.activeTab = id;
      return navStatus.activeTab;
    }

    navStatus.getActiveTab = function(){
      // return active tab id for listener class from adjacent scopes & directives
      return navStatus.activeTab;
    }

    navStatus.toggleEquipment = function(id) {
      navStatus.equipment[id].active = !navStatus.equipment[id].active;
      return navStatus.equipment;
    }

    navStatus.selectFleetModel = function(id) {
      navStatus.activeFleetModel = id;
      return navStatus.activeFleetModel;
    }

    navStatus.toggleFleetService = function(id) {
      var state = navStatus.equipment[navStatus.activeFleetModel].services[id].val;
      navStatus.equipment[navStatus.activeFleetModel].services[id].val = !state;
      return navStatus.equipment;
    }

    return navStatus;

  });
