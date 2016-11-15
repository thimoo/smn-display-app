'use strict';

describe('Service: dependencyService', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var dependencyService;
  beforeEach(inject(function (_dependencyService_) {
    dependencyService = _dependencyService_;
  }));

  it('should do something', function () {
    expect(!!dependencyService).toBe(true);
  });

});
