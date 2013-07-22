'use strict';

angular.module('appliedByDesignApp')
  .factory('fleetModel', function ($http, byFleetTypeFilter, activeEquipmentFilter) {
    // Service logic

    var fleetModel;

    // should be derived from fleetModel (eventually)
    var equipment = [
        {'name': '737-900', 'active': true},
        {'name': '737-800', 'active': true},
        {'name': '737-700', 'active': true},
        {'name': '737-400', 'active': true}
      ];

    // Public API here
    return {
      getData: function() {
        // load external data source into service layer.  This should be instantiated on creation
        // of the service, and only need to be run once.  Should only need to call this if we decide
        // to load new data sources down the road (e.g. switch airlines, load multiple annual data sets, etc)
        //
        $http({method: 'GET', url: 'images/full-data-model.json'})
          .success(function(data){
              fleetModel = data;
              console.log('fleet data model loaded')
            })
          .error(function(data){
              console.log('Resolve Error: data not loaded!');
            });
      }(),
      getFilteredData: function() {
        // returns filtered set of routes as subset of fleetModel
        var filterBy = activeEquipmentFilter(equipment);
        return byFleetTypeFilter(fleetModel, filterBy);

      },
      getEquipment: function() {
        return equipment;
      },
      toggleEquipment: function(id){
        equipment[id].active = !equipment[id].active;
      },
      isEquipActive: function(id) {
        return equipment[id].active;
      }
    };
  });
