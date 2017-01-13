'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.graphicService
 * @description
 * # graphicService
 * Service in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .service('graphicService', function () {
    
    this.toLabels = function (collection) {
      var serie = [];
      angular.forEach(collection.values, function (value) {
        serie.push(value.date);
      });
      return serie.reverse();
    };

    this.toSerie = function (collection, scale, bar, up) {
      scale = typeof scale !== 'undefined' ? scale : 1;
      bar = typeof bar !== 'undefined' ? bar : false;
      up = typeof up !== 'undefined' ? up : 100;

      var serie = [], add = 0, max, barSerie = [];

      angular.forEach(collection.values, function (value) {
        if (value.tag === 'no-data') serie.push(null);
        else serie.push(value.value * scale);
      });

      if (bar) {
        max = Math.max(...serie);
        max = (max === 0) ? up : max;

        angular.forEach(serie, function (value) {
          if (value === 0) barSerie.push(value + (max * 0.01));
          else barSerie.push(value);
        });
        serie = barSerie;
      }

      return serie.reverse();
    };

  });
