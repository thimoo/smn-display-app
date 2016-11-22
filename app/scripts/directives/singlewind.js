'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleWind
 * @description
 * # singleWind
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleWind', function () {
    return {
      templateUrl: 'views/singlewind.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService) {

        $scope.wind = '-';
        $scope.windGust = '-';
        $scope.windDirection = 0;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleWind') === -1) { return; }

          webService.get(data.data.data.wind, function (tempData) {
            $scope.wind = tempData.value;
          });

          webService.get(data.data.data.wind_gusts, function (tempData) {
            $scope.windGust = tempData.value;
          });

          webService.get(data.data.data.wind_dir, function (tempData) {
            $scope.windDirection = tempData.value;
          });

        });

      }
    };
  });
