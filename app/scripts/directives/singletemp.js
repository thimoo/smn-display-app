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
      scope: {},

      controller: function ($scope, webService) {

        $scope.temp = '–';
        $scope.tempMin = '–';
        $scope.tempMax = '–';

        $scope.noData = false;
        $scope.lastTimeUpdate = null;
        $scope.date = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleTemp') === -1) { return; }

          // Retrieve all needed URLs
          var tempUrl = data.data.data.temp;

          webService.get(tempUrl, function (data) {
            updateDisplay(data);
          });

          webService.getMin(tempUrl, function (data) {
            $scope.tempMin = data.value;
          });

          webService.getMax(tempUrl, function (data) {
            $scope.tempMax = data.value;
          });

        });

        // Display the content and check if a
        // no-data is retreived
        function updateDisplay (data) {
          if (data.tag === 'no-data') {
            $scope.noData = true;
            $scope.lastTimeUpdate = data.original.date;
            $scope.date = data.date;
            $scope.temp = data.original.value;
          } else {
            $scope.noData = false;
            $scope.temp = data.value;
            $scope.date = data.date;
          }
        }

      }
    };
  });
