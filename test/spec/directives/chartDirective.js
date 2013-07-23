'use strict';

describe('Directive: chartDirective', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<chart-directive></chart-directive>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the chartDirective directive');
  }));
});
