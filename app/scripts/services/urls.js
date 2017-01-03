'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.urls
 * @description
 * # urls
 * Constant in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .constant('urls', {
    base: CONFIG_API_ENDPOINT,
    profiles: 'profiles/'
  });
