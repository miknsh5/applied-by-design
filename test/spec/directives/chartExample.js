'use strict';

describe('Directive: chartExample', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<chart-example></chart-example>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the chartExample directive');
  }));
});
