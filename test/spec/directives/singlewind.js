'use strict';

describe('Directive: singleWind', function () {

  // load the directive's module
  beforeEach(module('swissMetNetDisplayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<single-wind></single-wind>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the singleWind directive');
  }));
});
