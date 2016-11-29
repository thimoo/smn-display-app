'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:GraphicTemp
 * @description
 * # GraphicTemp
 */
angular.module('swissMetNetDisplayApp')
  .directive('graphicTemp', function () {
    return {
      templateUrl: 'views/graphictemp.html',
      replace: true,
      restrict: 'E',

      controller: function ($scope, webService) {

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('graphicTemp') === -1) { return; }
          
          console.log('update graphic temp');

          var url = data.data.collections.temp;

          webService.get(url, function (data) {
            console.log(data);
          });

        });

      }
    };
  });
