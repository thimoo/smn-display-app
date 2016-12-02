'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:smnDisplay
 * @description
 * # smnDisplay
 */
angular.module('swissMetNetDisplayApp')
  .directive('smnDisplay', function () {
    return {
      templateUrl: 'views/smndisplay.html',
      replace: true,
      restrict: 'E'
    };
  });
