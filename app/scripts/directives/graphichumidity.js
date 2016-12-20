'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicHumidity
 * @description
 * # graphicHumidity
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicHumidity', function () {
    return {
      templateUrl: 'views/graphichumidity.html',
      replace: true,
      transclude: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService, graphicService) {
        /* globals Chartist: false */

        $scope.config = {
          seriesBarDistance: 0,
          high: 100,
          low: 0,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value) {
              // Transform the date attribute
              var date = new Date(value);
              return date.getMinutes() === 0 ? date.getHours() + 'h' : null;
            },
            labelOffset: {
              x: -2,
              y: 6
            },
          },
          axisY: {
            onlyInteger: true,
            labelOffset: {
              y: 4
            },
          }
        };

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('graphicHumidity') === -1) { return; }

          var url = data.data.collections.humidity;

          webService.get(url, function (d) {
            $scope.chart = Chartist.Bar('.ct-humidity-chart', {
              labels: graphicService.toLabels(d),
              series: [
                graphicService.toSerie(d)
              ]
            }, $scope.config);
          });

        });

      }
    };
  });
