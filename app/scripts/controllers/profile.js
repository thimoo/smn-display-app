'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $translate, $locale, $interval, tmhDynamicLocale, webService, dependencies, dependencyService) {

      var lastResponse = null;

      $scope.profile = null;

      $scope.displays = {
        singleTemp: false
      };

      // Setup the language
      $translate.use($routeParams.language);
      tmhDynamicLocale.set($routeParams.language);

      checkForUpdate();
      $interval(checkForUpdate, 60000);

      function refreshProfile () {
        // Retreive the profile and bootstrap the UI update
        webService.getProfile($routeParams.profile, 
          function (response) {
            lastResponse = response.data;
            $scope.profile = lastResponse.data;
            bootstrapUI();
          }, 
          function (response) {
            alert('an error occured');
          });
      }

      function checkForUpdate () {
        if (lastResponse == null) {
          // If no response is available, get the profile
          refreshProfile();
        } else {
          // if a response is available, check if an update
          // is available, if yes get the profile
          var lastUpdate = $scope.profile.lastUpdate;
          webService.checkForUpdate($scope.profile.$href, lastUpdate, function (response) {
            console.log('update', response.updateAvailable);
            if (response.updateAvailable) {
              refreshProfile();
            }
          });
        }
      }

      function bootstrapUI () {
        // For each directives in dependencies
        // check if all dependencies are available
        // and update the correct item in displays
        // array
        angular.forEach(dependencies, function (dependencies, directive) {
          $scope.displays[directive] = dependencyService.check(directive, dependencies, $scope.profile);
        });

        console.log($scope.displays);
      }

    });
