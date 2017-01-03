'use strict';

describe('Filter: smnNumber', function () {

  // load the filter's module
  beforeEach(module('swissMetNetDisplayApp'));

  // initialize a new instance of the filter before each test
  var smnNumber;
  beforeEach(inject(function ($filter) {
    smnNumber = $filter('smnNumber');
  }));

  it('should return the input prefixed with "smnNumber filter:"', function () {
    var text = 'angularjs';
    expect(smnNumber(text)).toBe('smnNumber filter: ' + text);
  });

});
