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

      controller: function ($scope, webService) {

        var minQnh = 990;
        var maxQnh = 1040;
        var diff = -40 - 90;
        var dist = 180;
        var oldTo = 0;

        $scope.hpa = 0;

        // 50 hPa
        // 0 -> 990
        // 50 -> 1040
        // 
        // 1017.8 -> 27.8
        // 

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singleQnh') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.qnh;

          webService.get(url, function (data) {

            $scope.hpa = data.value;

            var from = oldTo;
            var to = ((maxQnh - $scope.hpa - (maxQnh - minQnh)) * -1) / (maxQnh - minQnh) * dist + diff;

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
