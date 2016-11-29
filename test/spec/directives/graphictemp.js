'use strict';

describe('Directive: graphicTemp', function () {

  // load the directive's module
  beforeEach(module('swissMetNetDisplayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<graphic-temp></graphic-temp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the graphicTemp directive');
  }));
});
