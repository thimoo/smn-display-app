'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:GraphicsliderCtrl
 * @description
 * # GraphicsliderCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('GraphicsliderCtrl', function ($scope, $interval, $element, dependencyService) {
    
    $scope.interval;
    $scope.stack = [];

    // Liste slider update event
    $scope.$on('update-slider', function() {
      // Reset the stack
      $scope.stack = [];

      // foreach children element in the controller
      // that have not ng-hide class, swap the enabled
      // class
      angular.forEach($scope.graphs, function (element) {
        var elem = dependencyService.cssToDirectiveName(element);
        if ($scope.displays[elem] === true) { $scope.stack.push(element); }
      });

      // Refresh the slider
      hide();
      refresh();
    });

    function refresh () {
      $scope.counter = 0;
      $scope.start = true;

      var slide = function () {
        
        if (! $scope.start) {
          // remove old class
          angular.element(document.querySelector('.' + $scope.stack[$scope.counter]))
            .removeClass('enabled');

          $scope.counter++;
          $scope.counter %= $scope.stack.length;  
        }
        
        $scope.start = false;

        // add class on new element
        angular.element(document.querySelector('.' + $scope.stack[$scope.counter]))
          .addClass('enabled');

      };

      // Register interval to kill when location change
      $scope.interval = $interval(slide, 10000);
      slide();
    }

    function hide () {
      angular.forEach($scope.stack, function (element) {
        angular.element(document.querySelector('.' + element)).removeClass('enabled');
      });
    }

    // Clear the interval whent the location change
    // else two or more slider will be active
    $scope.$on('$locationChangeStart', function() {
      hide();
      refresh();
      if (typeof $scope.interval !== 'undefined') { $interval.cancel($scope.interval); }
    });

  });
