'use strict';

describe('Service: financialReports', function () {

  // load the service's module
  beforeEach(module('appliedByDesignApp'));

  // instantiate service
  var financialReports;
  beforeEach(inject(function (_financialReports_) {
    financialReports = _financialReports_;
  }));

  it('should do something', function () {
    expect(!!financialReports).toBe(true);
  });

});
