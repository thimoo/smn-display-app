'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singlePrecipitation
 * @description
 * # singlePrecipitation
 */
angular.module('swissMetNetDisplayApp')
  .directive('singlePrecipitation', function () {
    return {
      templateUrl: 'views/singleprecipitation.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService) {

        $scope.precipitation = '–';

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singlePrecipitation') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.sun;

          webService.getSu(url, function (data) {
            $scope.precipitation = data.value;
          });

        });

      }
    };
  });