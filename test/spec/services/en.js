'use strict';

describe('Service: en', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var en;
  beforeEach(inject(function (_en_) {
    en = _en_;
  }));

  it('should do something', function () {
    expect(!!en).toBe(true);
  });

});
