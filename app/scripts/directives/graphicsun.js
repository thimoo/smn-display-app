'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicSun
 * @description
 * # graphicSun
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicSun', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the graphicSun directive');
      }
    };
  });
