'use strict';

describe('Service: fleetDataModel', function () {

  // load the service's module
  beforeEach(module('appliedByDesignApp'));

  // instantiate service
  var fleetDataModel;
  beforeEach(inject(function (_fleetDataModel_) {
    fleetDataModel = _fleetDataModel_;
  }));

  it('should do something', function () {
    expect(!!fleetDataModel).toBe(true);
  });

});
