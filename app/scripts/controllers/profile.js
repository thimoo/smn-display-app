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
    $location,
    $interval, 
    tmhDynamicLocale, 
    webService, 
    dependencies, 
    dependencyService, 
    urlService) {

      var lastResponse = null;

      var updateLink = null;

      var checkInterval;

      $scope.displays = {};

      $scope.profile = {
        name: '',
        altitude: '',
        updateDate: null
      };

      $scope.position = {};

      // Setup the language
      if ($routeParams.language) {
        $translate.use($routeParams.language);
        tmhDynamicLocale.set($routeParams.language);
      }

      // Setup updateLink
      updateLink = urlService.getProfileUrl($routeParams.profile);

      function checkForUpdate () {
        // If no response is available, get the profile
        if (lastResponse === null) {
          refreshProfile();
        } else {
          // if a response is available, check if an update
          // is available, if yes get the profile
          var lastUpdate = lastResponse.lastUpdate;
          webService.checkForUpdate(updateLink, lastUpdate, 
            function (response) {
              if (response.updateAvailable) {
                refreshProfile();
              }
            }, function (errorResponse) {
              redirectError();
            });
        }
      }

      function refreshProfile () {
        // Retreive the profile and bootstrap the UI update
        webService.getProfile(updateLink, 
          function (response) {
            lastResponse = response.data.data;
            updateLink = lastResponse.$href;

            // If the profile is offline, then display
            // the error page. Else bootstrap the UI
            if (lastResponse.isOnline) {
              bootstrapUI(lastResponse);
            } else {
              redirectError();
            }
          }, 
          function (response) {
            redirectError();
          });
      }

      function bootstrapUI (profile) {
        // Refresh infos from profile
        loadProfile(profile);

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

            // Broadcast the update event to all directives
            $scope.$broadcast('update', {
              target: directive,
              data: urlsDependencies
            });
          }

        });

        // Set the effective position object
        angular.forEach(dependencies, function (dependencies, directive) {
          $scope.position[directive] = getPosition(directive);
        });

        // Broadcast the slider update event
        $scope.$broadcast('update-slider');
      }

      // Define the ordre of displayed directives
      function getPosition (directive) {
        var $position = 0;
        switch (directive) {
          case 'singlePrecipitation':
            $position = $scope.displays.singlePrecipitation + 0;
            break;
          case 'singleHumidity':
            $position = $scope.displays.singlePrecipitation + 
              $scope.displays.singleHumidity + 0;
            break;
          case 'singleQnh':
            $position = $scope.displays.singlePrecipitation + 
              $scope.displays.singleHumidity + 
              $scope.displays.singleQnh + 0;
            break;
          case 'singleSun':
            $position = $scope.displays.singlePrecipitation + 
              $scope.displays.singleHumidity + 
              $scope.displays.singleQnh  + 
              $scope.displays.singleSun + 0;
            break;
          case 'graphicTemp':
            $position = $scope.displays.graphicTemp + 0;
            break;
          case 'graphicSun':
            $position = $scope.displays.graphicTemp + 
              $scope.displays.graphicSun + 0;
            break;
          case 'graphicQnh':
            $position = $scope.displays.graphicTemp + 
              $scope.displays.graphicSun + 
              $scope.displays.graphicQnh + 0;
            break;
          case 'graphicHumidity':
            $position = $scope.displays.graphicTemp + 
              $scope.displays.graphicSun + 
              $scope.displays.graphicQnh
              $scope.displays.graphicHumidity + 0;
            break;
          case 'graphicWind':
            $position = $scope.displays.graphicWind + 0;
            break;
          case 'graphicPrecipitation':
            $position = $scope.displays.graphicWind + 
              $scope.displays.graphicPrecipitation + 0;
            break;
          case 'smnDisplay':
            $position = $scope.displays.graphicWind + 
              $scope.displays.graphicPrecipitation + 1;
            break;
        }
        return $position;
      }

      // Load all scope informations used to display
      // the profile
      function loadProfile (profile) {
        $scope.profile = {
          name: profile.stnCode,
          altitude: profile.altitude,
          updateDate: profile.lastUpdate
        };
      }

      function redirectError () {
        // Clear the refresh profile interval
        $interval.cancel(checkInterval);

        // Redirect to the error page with the current
        // profile and language informations
        $location.path('/error' + $location.$$url);
      }

      // Setup the interval
      checkForUpdate();
      checkInterval = $interval(checkForUpdate, 60000);

    });
