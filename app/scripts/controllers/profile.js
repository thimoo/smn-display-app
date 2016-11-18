'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('ProfileCtrl', function (
    $scope, 
    $routeParams, 
    $translate, 
    $locale, 
    $interval, 
    tmhDynamicLocale, 
    webService, 
    dependencies, 
    dependencyService, 
    urlService) {

      var lastResponse = null;

      var updateLink = null;

      $scope.displays = {
        singleTemp: false
      };

      // Setup the language
      if ($routeParams.language) {
        $translate.use($routeParams.language);
        tmhDynamicLocale.set($routeParams.language);
      }

      // Setup updateLink
      updateLink = urlService.getProfileUrl($routeParams.profile);

      checkForUpdate();
      $interval(checkForUpdate, 60000); //60000

      function refreshProfile () {
        // Retreive the profile and bootstrap the UI update
        webService.getProfile(updateLink, 
          function (response) {
            lastResponse = response.data.data;
            updateLink = lastResponse.$href;
            bootstrapUI(lastResponse);
          }, 
          function (response) {
            // TODO if network error display specific page
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
          var lastUpdate = lastResponse.lastUpdate;
          webService.checkForUpdate(updateLink, lastUpdate, function (response) {
            console.log('update', response.updateAvailable);
            if (response.updateAvailable) {
              refreshProfile();
            }
          });
          // TODO if network error display specific page
        }
      }

      function bootstrapUI (profile) {
        // For each directives in dependencies
        // check if all dependencies are available
        // and broadcast an update event with a
        // targeted directive and an object containing
        // all urls needed to refresh the targeted 
        // directive
        angular.forEach(dependencies, function (dependencies, directive) {
          // Check if all dependencies are present in the
          // profile
          var mustBeDisplayed = dependencyService.check(directive, dependencies, profile);

          // Show or hide the directive based on the
          // retreived value by the dependency service
          $scope.displays[directive] = mustBeDisplayed;

          // If the value returned by the dependency
          // service is true, then the directive must
          // be updated
          if (mustBeDisplayed) {
            // Get the URLs object of dependencies based on
            // the retreived profiles
            var urlsDependencies = dependencyService.getUrls(dependencies, profile);

            $scope.$broadcast('update', {
              target: directive,
              data: urlsDependencies
            });
          }
        });
      }

    });
