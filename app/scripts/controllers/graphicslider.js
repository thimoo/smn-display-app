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
    var stack = [];

    // Liste slider update event
    $scope.$on('update-slider', function() {

      // foreach children element in the controller
      // that have not ng-hide class, swap the enabled
      // class
      angular.forEach($scope.graphs, function (element) {
        var elem = dependencyService.cssToDirectiveName(element);
        if ($scope.displays[elem] === true) { stack.push(element); }
      });

      // Refresh the slider
      hide(stack);
      refresh(stack);
    });

    function refresh (stack) {
      var interval;
      var counter = 0;
      var start = true;
      var max = stack.length;

      var slide = function () {

        if (! start) {
          // remove old class
          var oldElem = angular.element(document.querySelector('.' + stack[counter]));
          oldElem.removeClass('enabled');

          counter++;
          counter %= max;  
        }
        
        start = false;

        // add class on new element
        var newElem = angular.element(document.querySelector('.' + stack[counter]));
        newElem.addClass('enabled');

      };

      if (typeof interval !== 'undefined') { $interval.cancel(interval); }
      interval = $interval(slide, 10000);
      slide();
    }

    function hide (stack) {
      angular.forEach(stack, function (element) {
          angular.element(document.querySelector('.' + element)).removeClass('enabled');
      });
    }

  });
