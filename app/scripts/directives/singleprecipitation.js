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
      scope: {},

      controller: function ($scope, webService) {

        $scope.precipitation = '–';

        $scope.noData = false;
        $scope.lastTimeUpdate = null;

        $scope.$on('update', function (event, data) {
          // If the targeted directive is not this
          // skip the update
          if (data.target.indexOf('singlePrecipitation') === -1) { return; }

          // Retrieve all needed URLs
          var url = data.data.data.precipitation;

          webService.getSum(url, function (data) {
            if (data.tag === 'no-data') {
              $scope.noData = true;
              $scope.lastTimeUpdate = data.original.date;
              $scope.precipitation = data.original.value;
            } else {
              $scope.noData = false;
              $scope.precipitation = data.value;
            }
          });

        });

        $scope.$watch('precipitation', function(newValue, oldValue) {
          if (newValue !== '–') {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            angular.element(document.querySelector('.precipitation-rotating'))
              .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
                angular.element(this).removeClass('animated flipInX');
            });
          }
        });

      }
    };
  });
