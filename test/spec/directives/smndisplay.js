'use strict';

describe('Directive: smnDisplay', function () {

  // load the directive's module
  beforeEach(module('swissMetNetDisplayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<smn-display></smn-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the smnDisplay directive');
  }));
});
