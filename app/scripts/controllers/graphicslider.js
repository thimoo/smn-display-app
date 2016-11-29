'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:GraphicsliderCtrl
 * @description
 * # GraphicsliderCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('GraphicsliderCtrl', function ($scope, $interval) {
    
    var counter = 0;

    $scope.disabled1 = true;
    $scope.disabled2 = false;

    $interval(function() {

      counter++;
      counter %= 2;

      $scope.disabled1 = (counter == 0);
      $scope.disabled2 = (counter == 1);


    }, 5000);

  });
