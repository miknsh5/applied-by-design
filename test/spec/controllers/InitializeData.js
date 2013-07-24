'use strict';

describe('Controller: InitializeDataCtrl', function () {

  // load the controller's module
  beforeEach(module('appliedByDesignApp'));

  var InitializeDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InitializeDataCtrl = $controller('InitializeDataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
