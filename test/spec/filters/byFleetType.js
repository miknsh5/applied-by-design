'use strict';

describe('Filter: byFleetType', function () {

  // load the filter's module
  beforeEach(module('appliedByDesignApp'));

  // initialize a new instance of the filter before each test
  var byFleetType;
  beforeEach(inject(function ($filter) {
    byFleetType = $filter('byFleetType');
  }));

  it('should return the input prefixed with "byFleetType filter:"', function () {
    var text = 'angularjs';
    expect(byFleetType(text)).toBe('byFleetType filter: ' + text);
  });

});
