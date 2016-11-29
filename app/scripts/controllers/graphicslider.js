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

    $scope.g1 = true;
    $scope.g2 = true;

    $interval(function() {

      counter++;
      counter %= 2;

      $scope.g1 = (counter == 0);
      $scope.g2 = (counter == 1);


    }, 5000);

  });
