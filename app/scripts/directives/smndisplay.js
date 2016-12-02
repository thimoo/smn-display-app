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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the smnDisplay directive');
      }
    };
  });
