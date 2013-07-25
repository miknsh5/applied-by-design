'use strict';

describe('Controller: FleetPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('appliedByDesignApp'));

  var FleetPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FleetPanelCtrl = $controller('FleetPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
