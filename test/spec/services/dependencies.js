'use strict';

describe('Service: dependencies', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var dependencies;
  beforeEach(inject(function (_dependencies_) {
    dependencies = _dependencies_;
  }));

  it('should do something', function () {
    expect(!!dependencies).toBe(true);
  });

});
