'use strict';

describe('Directive: worldMap', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<world-map></world-map>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the worldMap directive');
  }));
});
