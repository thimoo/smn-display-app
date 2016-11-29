'use strict';

describe('Service: graphicService', function () {

  // load the service's module
  beforeEach(module('swissMetNetDisplayApp'));

  // instantiate service
  var graphicService;
  beforeEach(inject(function (_graphicService_) {
    graphicService = _graphicService_;
  }));

  it('should do something', function () {
    expect(!!graphicService).toBe(true);
  });

});
