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
    singleTowzTemp: [
      'data-temp_towz',
      'collections-temp_towz'
    ],
    singleWind: [
      'data-wind',
      'data-wind_dir',
      'data-wind_gusts'
    ],
    singleTowzWind: [
      'data-wind_towz',
      'data-wind_dir_towz',
      'data-wind_gusts_towz'
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
    graphicTowzTemp: [
      'collections-temp_towz'
    ],
    graphicPrecipitation: [
      'collections-precipitation'
    ],
    graphicHumidity: [
      'collections-humidity'
    ],
    graphicSun: [
      'collections-sun'
    ],
    graphicWind: [
      'collections-wind',
      'collections-wind_gusts'
    ],
    graphicTowzWind: [
      'collections-wind_towz',
      'collections-wind_gusts_towz'
    ],
    graphicQnh: [
      'collections-qnh'
    ],
    smnDisplay: []
  });
