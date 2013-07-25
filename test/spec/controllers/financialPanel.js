'use strict';

describe('Controller: FinancialPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('appliedByDesignApp'));

  var FinancialPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinancialPanelCtrl = $controller('FinancialPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
