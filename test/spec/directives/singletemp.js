'use strict';

describe('Directive: singleTemp', function () {

  // load the directive's module
  beforeEach(module('swissMetNetDisplayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<single-temp></single-temp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the singleTemp directive');
  }));
});
