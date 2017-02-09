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
            labelInterpolationFnc: function(value) {
              return value * 10 % 1 === 0 ? value : null;
            },
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
            var serie = graphicService.toSerie(d, 1, true, 1, 0.02);
            var maxValue = Math.max.apply(null,serie);
            if (maxValue === 0.02) {
              $scope.config.high = 1;
            } else {
              $scope.config.high = maxValue + 0.1;
            }
            $scope.chart = Chartist.Bar('.ct-precipitation-chart', {
              labels: graphicService.toLabels(d),
              series: [
                serie
              ]
            }, $scope.config).on("draw", function(data) {
              if (data.type === 'bar') {
                data.element.animate({
                  y2: {
                    begin: 1000,
                    dur: 500,
                    from: data.y1,
                    to: data.y2,
                    easing: Chartist.Svg.Easing.easeOutSine,
                  }
                });
              }
            });
          });

        });

      }
    };
  });
