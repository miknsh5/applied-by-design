'use strict';

describe('Directive: bulletChart', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<bullet-chart></bullet-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the bulletChart directive');
  }));
});
