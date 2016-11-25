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

      controller: function ($scope, webService) {

        $scope.humidity = '–';

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleHumidity') === -1) { return; }

          // Retrieve all needed URLs
          var humUrl = data.data.data.humidity;

          webService.get(humUrl, function (humData) {
            $scope.humidity = humData.value;
          });

        });

      }
    };
  });
