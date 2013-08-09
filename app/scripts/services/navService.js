'use strict';

angular.module('appliedByDesignApp')
  .factory('navService', function () {
    // Service logic

    // var activeTabId = 0;

    var obj = {};
    obj.showPanel        = true;
    obj.showEquipPanel   = true;
    obj.showReport       = false;
    obj.activeTab        = 1;
    obj.equipment        = []; //this should probably be its own service
    obj.activeFleetModel = 0;
    obj.activeYear       = 0;
    obj.activeMetricName = 'Crew';


    obj.togglePanel = function(){
      obj.showPanel = !obj.showPanel;
      return obj.showPanel;
    }
    
    obj.toggleEquipPanel = function(){
      obj.showEquipPanel = !obj.showEquipPanel;
      return obj.showEquipPanel;
    }   
     
    obj.toggleReportPanel = function(){
      obj.showReport = !obj.showReport;
      return obj.showReport;
    }

    obj.selectPanelTab = function(id){
      obj.activeTab = id;
      return obj.activeTab;
    }

    obj.getActiveTab = function(){
      // return active tab id for listener class from adjacent scopes & directives
      return obj.activeTab;
    }

    obj.toggleEquipment = function(id) {
      obj.equipment[id].active = !obj.equipment[id].active;
      return obj.equipment;
    }

    obj.selectFleetModel = function(id) {
      obj.activeFleetModel = id;
      return obj.activeFleetModel;
    }

    obj.toggleFleetService = function(id) {
      var state = obj.equipment[obj.activeFleetModel].services[id].val;
      obj.equipment[obj.activeFleetModel].services[id].val = !state;
      return obj.equipment;
    }

    return obj;

  });
