'use strict';

/**
 * @ngdoc filter
 * @name swissMetNetDisplayApp.filter:smnNumber
 * @function
 * @description
 * # smnNumber
 * Filter in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .filter('smnNumber', function () {
    return function (input) {
      if (typeof input === 'number') return input.toFixed(1);
      else return input;
    };
  });
