'use strict';

describe('Service: it', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var it;
  beforeEach(inject(function (_it_) {
    it = _it_;
  }));

  it('should do something', function () {
    expect(!!it).toBe(true);
  });

});
