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
      angular.forEach(collection.values, function (value, index) {
        serie.push(value.date);
      });
      return serie;
    };

    this.toSerie = function (collection) {
      var serie = [];
      angular.forEach(collection.values, function (value, index) {
        serie.push(value.value);
      });
      return serie;
    };

  });
