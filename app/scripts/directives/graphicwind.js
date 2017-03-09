'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicWind
 * @description
 * # graphicWind
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicWind', function () {
    return {
      templateUrl: 'views/graphicwind.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($q, $scope, $http, webService, graphicService) {
        /* globals Chartist: false */

        $scope.config = {
          showPoint: false,
          showArea: true,
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
          if (data.target.indexOf('graphicWind') === -1) { return; }

          var urlWind = data.data.collections.wind;
          var urlWindGusts = data.data.collections.wind_gusts;

          $q.all([
            $http.get(urlWind),
            $http.get(urlWindGusts)
          ]).then(function(results) {

            var wind = results[0];
            var windGusts = results[1];
            var windGustSerie = graphicService.toSerie(windGusts.data.data);

            $scope.config.high = (Math.max.apply(null, windGustSerie) < 20) ? 20 : undefined;

            $scope.chart = Chartist.Line('.ct-wind-chart', {
              labels: graphicService.toLabels(wind.data.data),
              series: [
                graphicService.toSerie(wind.data.data),
                windGustSerie,
              ]
            }, $scope.config).on("draw", function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  opacity: {
                    begin: 1000,
                    dur: 500,
                    from: 0,
                    to: 1,
                  }
                });
              }
            });

          });

        });

      }
    };
  });
