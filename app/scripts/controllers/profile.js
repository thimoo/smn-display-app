'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $translate, $locale, tmhDynamicLocale) {
      console.log($routeParams.station);
      console.log($routeParams.language);

      $translate.use($routeParams.language);
      tmhDynamicLocale.set($routeParams.language);

      console.log($locale);

      $scope.date = new Date();

    });
