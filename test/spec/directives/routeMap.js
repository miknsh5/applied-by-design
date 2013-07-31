'use strict';

describe('Directive: routeMap', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<route-map></route-map>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the routeMap directive');
  }));
});
