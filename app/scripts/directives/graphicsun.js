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

      controller: function ($scope, webService, graphicService) {

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Bar('.ct-sun-chart', {}, {
          seriesBarDistance: 0,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value, index) {
              // Transform the date attribute
              var date = new Date(value);
              return date.getMinutes() == 0 ? date.getHours() + 'h' : null;
            }
          }
        });

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('graphicSun') === -1) { return; }

          console.log('update sun');

          var url = data.data.collections.sun;

          webService.get(url, function (d) {

            console.log(d);

            var gdata = {
              labels: graphicService.toLabels(d),
              series: [
                graphicService.toSerie(d)
              ]
            };
            graphic.update(gdata);
          });

        });

      }
    };
  });
