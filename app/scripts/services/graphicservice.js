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

    this.toSerie = function (collection, scale) {
      scale = typeof scale !== 'undefined' ? scale : 1;
      var serie = [];
      angular.forEach(collection.values, function (value) {
        serie.push(value.value * scale);
      });
      return serie.reverse();
    };

  });
