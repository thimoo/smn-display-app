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
      templateUrl: 'views/singlesun.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService) {

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleSun') === -1) { return; }

        });

      }
    };
  });
