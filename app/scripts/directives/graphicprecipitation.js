'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicPrecipitation
 * @description
 * # graphicPrecipitation
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicPrecipitation', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the graphicPrecipitation directive');
      }
    };
  });
