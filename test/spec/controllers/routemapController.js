'use strict';

describe('Controller: RoutemapControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('appliedByDesignApp'));

  var RoutemapControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoutemapControllerCtrl = $controller('RoutemapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});