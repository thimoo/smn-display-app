'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleQnh
 * @description
 * # singleQnh
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleQnh', function () {
    return {
      templateUrl: 'views/singleqnh.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService) {

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleQnh') === -1) { return; }

        });

      }
    };
  });
