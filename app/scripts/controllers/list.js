'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('ListCtrl', function ($scope, $routeParams, $translate, tmhDynamicLocale) {
    
    // Setup the language
    if ($routeParams.language) {
      $scope.lang = $routeParams.language;
      $translate.use($routeParams.language);
      tmhDynamicLocale.set($routeParams.language);
    } else {
      tmhDynamicLocale.set('de');
    }

  });
