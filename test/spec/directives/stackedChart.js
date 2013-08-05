'use strict';

describe('Directive: stackedChart', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<stacked-chart></stacked-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the stackedChart directive');
  }));
});
