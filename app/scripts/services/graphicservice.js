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
    
    this.toLabel = function (collection) {
      // TODO
      return [];
    };

    this.toSerie = function (collection) {
      var serie = [];
      angular.forEach(collection.values, function (value, index) {
        serie.push(value.value);
      });
      return serie;
    };

  });
