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

      controller: function ($scope, webService, graphicService) {

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Bar('.ct-precipitation-chart', {}, {
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
          if (data.target.indexOf('graphicPrecipitation') === -1) { return; }

          var url = data.data.collections.precipitation;

          webService.get(url, function (d) {
            graphic.update({
              labels: graphicService.toLabels(d),
              series: [
                graphicService.toSerie(d)
              ]
            });
          });

        });

      }
    };
  });
