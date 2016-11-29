'use strict';

describe('Controller: GraphicsliderCtrl', function () {

  // load the controller's module
  beforeEach(module('swissMetNetDisplayApp'));

  var GraphicsliderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GraphicsliderCtrl = $controller('GraphicsliderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GraphicsliderCtrl.awesomeThings.length).toBe(3);
  });
});
