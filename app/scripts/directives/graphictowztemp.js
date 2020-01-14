'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicTowzTemp
 * @description
 * # graphicTowzTemp
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicTowzTemp', function () {
    return {
      templateUrl: 'views/graphictowztemp.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService, graphicService) {
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

        $scope.$on('update', function (event, edata) {
          // If the targeted directive is not this
          // skip the update
          if (edata.target.indexOf('graphicTowzTemp') === -1) { return; }

          var url = edata.data.collections.temp_towz;
          webService.get(url, function (d) {

            $scope.chart = Chartist.Line('.ct-towz-temp-chart', {
              labels: graphicService.toLabels(d),
              series: [
                graphicService.toSerie(d),
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
