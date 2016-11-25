'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleHumidity
 * @description
 * # singleHumidity
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleHumidity', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the singleHumidity directive');
      }
    };
  });
