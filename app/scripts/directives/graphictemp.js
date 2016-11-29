'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:GraphicTemp
 * @description
 * # GraphicTemp
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicTemp', function () {
    return {
      templateUrl: 'views/graphictemp.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService, graphicService) {

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Line('.ct-temp-chart', {}, {
          showPoint: false,
          showArea: true,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value, index) {
              // Transform the date attribute
              var date = new Date(value);
              return date.getMinutes() == 0 ? date.getHours() + 'h' : null;
            }
          }
        });

        $scope.$on('update', function (event, edata) {
          // If the targeted directive is not this
          // skip the update
          if (edata.target.indexOf('graphicTemp') === -1) { return; }

          var url = edata.data.collections.temp;

          webService.get(url, function (d) {
            console.log(d)
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
