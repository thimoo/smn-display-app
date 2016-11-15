'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleTemp
 * @description
 * # singleTemp
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleTemp', function () {
    return {
      templateUrl: 'views/singletemp.html',
      replace: true,
      restrict: 'E',

      scope: {
        update: '=',
        profile: '='
      },

      controller: function ($scope, webService) {

        $scope.temp = '-';
        $scope.tempMin = '-';
        $scope.tempMax = '-';

        $scope.$watch('update', function () {
          if ($scope.update) {
            update();
          }
        });

        function update () {

          angular.forEach($scope.profile.data, function (value, key) {

            if (value.code == 'temp') {

              webService.get(value.$href, function (data) {
                $scope.temp = data.value;
              });

              webService.getMin(value.$href, function (data) {
                $scope.tempMin = data.value;
              });

              webService.getMax(value.$href, function (data) {
                $scope.tempMax = data.value;
              });

            }
          });

        }

      }
    };
  });
