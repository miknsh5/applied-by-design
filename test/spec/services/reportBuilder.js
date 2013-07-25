'use strict';

describe('Service: reportBuilder', function () {

  // load the service's module
  beforeEach(module('appliedByDesignApp'));

  // instantiate service
  var reportBuilder;
  beforeEach(inject(function (_reportBuilder_) {
    reportBuilder = _reportBuilder_;
  }));

  it('should do something', function () {
    expect(!!reportBuilder).toBe(true);
  });

});
