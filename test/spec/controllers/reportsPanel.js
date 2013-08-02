'use strict';

describe('Controller: ReportsPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('appliedByDesignApp'));

  var ReportsPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsPanelCtrl = $controller('ReportsPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
