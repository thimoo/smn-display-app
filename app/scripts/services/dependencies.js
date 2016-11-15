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
      'collections-precipitation'
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
    graphTemp: [
      'collections-temp'
    ],
    graphPrecipitation: [
      'collections-precipitation'
    ],
    graphSun: [
      'collections-sun'
    ],
    graphWind: [
      'collections-wind',
      'collections-wind_gusts'
    ],
    graphQnh: [
      'collections-qnh'
    ]
  });
