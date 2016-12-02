'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleHumidity
 * @description
 * # singleHumidity
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleHumidity', function () {
    return {
      templateUrl: 'views/singlehumidity.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService) {

        $scope.humidity = '–';
        
        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleHumidity') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.humidity;

          webService.get(url, function (data) {
            if (data.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = data.original.date;
              $scope.humidity = data.original.value;
            } else {
              $scope.humidity = data.value;
            }
          });

        });

      }
    };
  });
