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

        var data = {
          // A labels array that can contain any sort of values
          labels: [],
          // Our series array that contains series objects or in this case series data arrays
          series: [
            []
          ]
        };

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Line('.ct-chart', data);

        $scope.$on('update', function (event, edata) {
          // If the targeted directive is not this
          // skip the update
          if (edata.target.indexOf('graphicTemp') === -1) { return; }

          var url = edata.data.collections.temp;

          webService.get(url, function (d) {
            var gdata = {
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
