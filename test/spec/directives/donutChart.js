'use strict';

describe('Directive: donutChart', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<donut-chart></donut-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the donutChart directive');
  }));
});
