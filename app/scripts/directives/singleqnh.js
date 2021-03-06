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
        /* globals d3: false */

        var minQnh = 990;
        var maxQnh = 1040;
        var dist = 180;
        var diff = 0 - (dist / 2);

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
              $scope.noData = false;
              $scope.hpa = data.value;
            }

            from = to;
            // console.log(from);
            //
            to = ((maxQnh - $scope.hpa - (maxQnh - minQnh)) * -1) / (maxQnh - minQnh) * dist + diff;

            function rotTween() {
              var i = d3.interpolate(from, to);
              return function(t) {
                  return 'rotate(' + i(t) + ' 51.8 51.25)';
              };
            }

            var svg = d3.select('#arrow-gnh');
            svg.transition().duration(1000).attrTween('transform', rotTween);

          });

        });

        $scope.$watch('hpa', function(newValue, oldValue) {
          if (newValue !== 0) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('.qnh-rotating'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

      }
    };
  });
