'use strict';

describe('Directive: dailyFlights', function () {
  beforeEach(module('appliedByDesignApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<daily-flights></daily-flights>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the dailyFlights directive');
  }));
});
