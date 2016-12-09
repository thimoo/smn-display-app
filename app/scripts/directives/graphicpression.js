'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:graphicPression
 * @description
 * # graphicPression
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicPression', function () {
    return {
      templateUrl: 'views/graphicpression.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService, graphicService) {
        /* globals Chartist: false */

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Line('.ct-pression-chart', {}, {
          showPoint: false,
          showArea: true,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value) {
              // Transform the date attribute
              var date = new Date(value);
              return date.getMinutes() === 0 ? date.getHours() + 'h' : null;
            }
          },
          axisY: {
            onlyInteger: true
          }
        });

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('graphicQnh') === -1) { return; }

          var url = data.data.collections.qnh;

          webService.get(url, function (d) {
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
