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

      controller: function ($q, $scope, $http, webService, graphicService) {
        /* globals Chartist: false */

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var graphic = new Chartist.Line('.ct-wind-chart', {}, {
          showPoint: false,
          showArea: true,
          axisX: {
            showGrid: false,
            labelInterpolationFnc: function(value) {
              // Transform the date attribute
              var date = new Date(value);
              return date.getMinutes() === 0 ? date.getHours() + 'h' : null;
            }
          }
        });

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

            graphic.update({
              labels: graphicService.toLabels(wind.data.data),
              series: [
                graphicService.toSerie(wind.data.data),
                graphicService.toSerie(windGusts.data.data),
              ]
            });

          });

        });

      }
    };
  });
