'use strict';

/**
 * @ngdoc directive
 * @name swissMetNetDisplayApp.directive:singleQnh
 * @description
 * # singleQnh
 */
angular.module('swissMetNetDisplayApp')
  .directive('singleQnh', function () {
    return {
      templateUrl: 'views/singleqnh.html',
      replace: true,
      restrict: 'E',
      scope: {},

      controller: function ($scope, webService) {

        var minQnh = 990;
        var maxQnh = 1040;
        var dist = 180;
        var diff = -40 - (dist / 2);

        var to = 0;
        var from = 0;

        $scope.hpa = 0;
        
        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleQnh') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.qnh;

          webService.get(url, function (data) {

            if (data.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = data.original.date;
              $scope.hpa = data.original.value;
            } else {
              $scope.hpa = data.value;
            }

            from = to;
            to = ((maxQnh - $scope.hpa - (maxQnh - minQnh)) * -1) / (maxQnh - minQnh) * dist + diff;

            var svg = d3.select("#arrow-gnh");

            svg.transition().duration(1000).attrTween('transform', rotTween);
            
            function rotTween() {
              var i = d3.interpolate(from, to);
              return function(t) {
                  return "rotate(" + i(t) + " 50.867 47.148)";
              };
            }

          });

        });

      }
    };
  });
