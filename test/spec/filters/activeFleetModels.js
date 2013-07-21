'use strict';

describe('Filter: activeFleetModels', function () {

  // load the filter's module
  beforeEach(module('appliedByDesignApp'));

  // initialize a new instance of the filter before each test
  var activeFleetModels;
  beforeEach(inject(function ($filter) {
    activeFleetModels = $filter('activeFleetModels');
  }));

  it('should return the input prefixed with "activeFleetModels filter:"', function () {
    var text = 'angularjs';
    expect(activeFleetModels(text)).toBe('activeFleetModels filter: ' + text);
  });

});
