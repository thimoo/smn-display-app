'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicPrecipitation
 * @description
 * # graphicPrecipitation
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicPrecipitation', function () {
    return {
      templateUrl: 'views/graphicprecipitation.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService, graphicService) {
        /* globals Chartist: false */

        $scope.config = {
          seriesBarDistance: 0,
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
            labelOffset: {
              y: 4
            },
          }
        };

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('graphicPrecipitation') === -1) { return; }

          var url = data.data.collections.precipitation;

          webService.get(url, function (d) {
            var serie = graphicService.toSerie(d, 1, true, 1);

            if (Math.max(...serie) === 0.01) {
              $scope.config.high = 1;
            }
            $scope.chart = Chartist.Bar('.ct-precipitation-chart', {
              labels: graphicService.toLabels(d),
              series: [
                serie
              ]
            }, $scope.config);
          });

        });

      }
    };
  });
