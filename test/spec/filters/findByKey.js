'use strict';

describe('Filter: findByKey', function () {

  // load the filter's module
  beforeEach(module('appliedByDesignApp'));

  // initialize a new instance of the filter before each test
  var findByKey;
  beforeEach(inject(function ($filter) {
    findByKey = $filter('findByKey');
  }));

  it('should return the input prefixed with "findByKey filter:"', function () {
    var text = 'angularjs';
    expect(findByKey(text)).toBe('findByKey filter: ' + text);
  });

});
