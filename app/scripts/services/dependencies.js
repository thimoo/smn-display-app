'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.dependencies
 * @description
 * # dependencies
 * Constant in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .constant('dependencies', {
    singleTemp: [
      'data-temp',
      'collections-temp'
    ],
    singleWind: [
      'data-wind',
      'data-wind_dir',
      'data-wind_gusts'
    ],
    singlePrecipitation: [
      'data-precipitation'
    ],
    singleHumidity: [
      'data-humidity'
    ],
    singleQnh: [
      'data-qnh'
    ],
    singleSun: [
      'data-sun'
    ],
    graphicTemp: [
      'collections-temp'
    ],
    graphicPrecipitation: [
      'collections-precipitation'
    ],
    graphicSun: [
      'collections-sun'
    ],
    graphicWind: [
      'collections-wind',
      'collections-wind_gusts'
    ],
    graphicQnh: [
      'collections-qnh'
    ],
    smnDisplay: []
  });
