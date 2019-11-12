'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleTowzTemp
 * @description
 * # singleTowzTemp
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleTowzTemp', function () {
    return {
      templateUrl: 'views/singletemp.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService) {

        $scope.temp = '–';
        $scope.tempMin = '–';
        $scope.tempMax = '–';

        $scope.noData = false;
        $scope.lastTimeUpdate = null;
        $scope.date = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleTowzTemp') === -1) { return; }
          // Retrieve all needed URLs
          var tempUrl = data.data.data.temp_towz;

          webService.get(tempUrl, function (data) {
            updateDisplay(data);
          });

          webService.getMin(tempUrl, function (data) {
            $scope.tempMin = data.value;
          });

          webService.getMax(tempUrl, function (data) {
            $scope.tempMax = data.value;
          });

        });

        // Display the content and check if a
        // no-data is retreived
        function updateDisplay (data) {
          if (data.tag === 'no-data') {
            $scope.noData = true;
            $scope.lastTimeUpdate = data.original.date;
            $scope.date = data.date;
            $scope.temp = data.original.value;
          } else {
            $scope.noData = false;
            $scope.temp = data.value;
            $scope.date = data.date;
          }
        }

        $scope.$watch('temp', function(newValue, oldValue) {
          if (newValue !== '–') {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('.temp-rotating'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

        $scope.$watch('tempMin', function(newValue, oldValue) {
          if (newValue !== '–') {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('#h24-min'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

        $scope.$watch('tempMax', function(newValue, oldValue) {
          if (newValue !== '–') {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('#h24-max'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

      }
    };
  });
