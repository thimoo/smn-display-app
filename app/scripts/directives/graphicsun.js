'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicSun
 * @description
 * # graphicSun
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicSun', function () {
    return {
      templateUrl: 'views/graphicsun.html',
      replace: true,
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
          if (data.target.indexOf('graphicSun') === -1) { return; }

          var url = data.data.collections.sun;

          webService.get(url, function (d) {
            $scope.chart = Chartist.Bar('.ct-sun-chart', {
              labels: graphicService.toLabels(d),
              series: [
                graphicService.toSerie(d, 10, true)
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
