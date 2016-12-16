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
      scope: {},

      controller: function ($scope, $document, webService) {
        /* globals d3: false */

        $scope.wind = '-';
        $scope.windGust = '-';
        $scope.windDirection = 0;
        $scope.oldWindDirection = 0;

        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleWind') === -1) { return; }

          webService.get(data.data.data.wind, function (tempData) {
            if (tempData.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = tempData.original.date;
              $scope.wind = tempData.original.value;
            } else {
              $scope.noData = false;
              $scope.wind = tempData.value;
            }
          });

          webService.get(data.data.data.wind_gusts, function (tempData) {
            if (tempData.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = tempData.original.date;
              $scope.windGust = tempData.original.value;
            } else {
              $scope.noData = false;
              $scope.windGust = tempData.value;
            }
          });

          webService.get(data.data.data.wind_dir, function (tempData) {
            if (tempData.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = tempData.original.date;
              $scope.oldWindDirection = $scope.windDirection;
              $scope.windDirection = tempData.original.value;
            } else {
              $scope.noData = false;
              $scope.oldWindDirection = $scope.windDirection;
              $scope.windDirection = tempData.value;
            }
            
            function rotTween() {
              var i = d3.interpolate($scope.oldWindDirection, $scope.windDirection);
              return function(t) {
                  return 'rotate(' + i(t) + ' 207.71 200.72)';
              };
            }

            var svg = d3.select('#wind-direction');
            svg.transition().duration(1000).attrTween('transform', rotTween);

          });

        });

      }
    };
  });
