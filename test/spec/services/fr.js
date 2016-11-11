'use strict';

describe('Service: fr', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var fr;
  beforeEach(inject(function (_fr_) {
    fr = _fr_;
  }));

  it('should do something', function () {
    expect(!!fr).toBe(true);
  });

});
