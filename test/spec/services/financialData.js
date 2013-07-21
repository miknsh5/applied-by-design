'use strict';

describe('Service: financialData', function () {

  // load the service's module
  beforeEach(module('appliedByDesignApp'));

  // instantiate service
  var financialData;
  beforeEach(inject(function (_financialData_) {
    financialData = _financialData_;
  }));

  it('should do something', function () {
    expect(!!financialData).toBe(true);
  });

});
