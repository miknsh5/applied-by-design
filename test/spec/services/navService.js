'use strict';

describe('Service: navService', function () {

  // load the service's module
  beforeEach(module('appliedByDesignApp'));

  // instantiate service
  var navService;
  beforeEach(inject(function (_navService_) {
    navService = _navService_;
  }));

  it('should do something', function () {
    expect(!!navService).toBe(true);
  });

});
