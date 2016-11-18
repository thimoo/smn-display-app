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

      controller: function ($scope, webService) {

        $scope.temp = '-';
        $scope.tempMin = '-';
        $scope.tempMax = '-';

        $scope.date = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleTemp') === -1) return;

          // Retrieve all needed URLs
          var tempUrl = data.data.data.temp;

          webService.get(tempUrl, function (tempData) {
            $scope.temp = tempData.value;
            $scope.date = tempData.date;
          });

          webService.getMin(tempUrl, function (tempData) {
            $scope.tempMin = tempData.value;
          });

          webService.getMax(tempUrl, function (tempData) {
            $scope.tempMax = tempData.value;
          });

        });

      }
    };
  });
