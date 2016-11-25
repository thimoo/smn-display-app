'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleSun
 * @description
 * # singleSun
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleSun', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the singleSun directive');
      }
    };
  });
