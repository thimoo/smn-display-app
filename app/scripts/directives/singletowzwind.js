'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleTowzWind
 * @description
 * # singleTowzWind
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleTowzWind', function () {
    return {
      templateUrl: 'views/singletowzwind.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, $document, webService) {
        /* globals d3: false */

        $scope.wind = '–';
        $scope.windGust = '–';
        $scope.windDirection = 0;
        $scope.oldWindDirection = 0;

        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleTowzWind') === -1) { return; }

          webService.get(data.data.data.wind_towz, function (tempData) {
            if (tempData.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = tempData.original.date;
              $scope.wind = tempData.original.value;
            } else {
              $scope.noData = false;
              $scope.wind = tempData.value;
            }
          });

          webService.get(data.data.data.wind_gusts_towz, function (tempData) {
            if (tempData.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = tempData.original.date;
              $scope.windGust = tempData.original.value;
            } else {
              $scope.noData = false;
              $scope.windGust = tempData.value;
            }
          });

          webService.get(data.data.data.wind_dir_towz, function (tempData) {

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

            var svg = d3.select('#wind-towz-direction');
            console.log(svg);
            svg.transition().duration(1000).attrTween('transform', rotTween);

          });

        });

        $scope.$watch('wind', function(newValue, oldValue) {
          if (newValue !== '–') {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('.wind-rotating'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

      }
    };
  });
