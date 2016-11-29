'use strict';

describe('Directive: graphicSun', function () {

  // load the directive's module
  beforeEach(module('swissMetNetDisplayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<graphic-sun></graphic-sun>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the graphicSun directive');
  }));
});
