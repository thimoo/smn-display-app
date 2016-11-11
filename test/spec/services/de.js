'use strict';

describe('Service: de', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var de;
  beforeEach(inject(function (_de_) {
    de = _de_;
  }));

  it('should do something', function () {
    expect(!!de).toBe(true);
  });

});
