'use strict';

describe('Filter: findAirport', function () {

  // load the filter's module
  beforeEach(module('appliedByDesignApp'));

  // initialize a new instance of the filter before each test
  var findAirport;
  beforeEach(inject(function ($filter) {
    findAirport = $filter('findAirport');
  }));

  it('should return the input prefixed with "findAirport filter:"', function () {
    var text = 'angularjs';
    expect(findAirport(text)).toBe('findAirport filter: ' + text);
  });

});
