'use strict';

describe('Filter: byKey', function () {

  // load the filter's module
  beforeEach(module('appliedByDesignApp'));

  // initialize a new instance of the filter before each test
  var byKey;
  beforeEach(inject(function ($filter) {
    byKey = $filter('byKey');
  }));

  it('should return the input prefixed with "byKey filter:"', function () {
    var text = 'angularjs';
    expect(byKey(text)).toBe('byKey filter: ' + text);
  });

});
