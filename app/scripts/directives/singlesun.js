'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleSun
 * @description
 * # singleSun
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleSun', function () {
    return {
      templateUrl: 'views/singlesun.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService) {

        $scope.sun = '–';
        
        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleSun') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.sun;

          webService.get(url, function (data) {
            if (data.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = data.original.date;
              $scope.sun = data.original.value * 10;
            } else {
              $scope.noData = false;
              $scope.sun = data.value * 10;
            }

            function rotTween() {
              var i = d3.interpolate(0, 360);
              return function(t) {
                  return 'rotate(' + i(t) + ' 46.445 46.445)';
              };
            }

            var svg = d3.select('#sunshine');
            svg.transition().duration(1000).attrTween('transform', rotTween);

          });

        });

      }
    };
  });
