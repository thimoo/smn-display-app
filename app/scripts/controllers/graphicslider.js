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

    $scope.f1 = true;
    // $scope.f2 = false;
    // $scope.f3 = false;

    $interval(function() {

      counter++;
      counter %= 1;

      $scope.f1 = (counter == 0);
      $scope.f2 = (counter == 1);
      $scope.f3 = (counter == 2);


    }, 5000);

  });
