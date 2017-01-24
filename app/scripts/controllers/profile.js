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
    $timeout,
    tmhDynamicLocale, 
    webService, 
    dependencies, 
    dependencyService, 
    urlService,
    ngProgressFactory) {

      var lastResponse = null;

      var updateLink = null;

      var checkInterval;
      var redirectErrorTimout = null;

      var state = 1;
      var stateInterval = null;

      $scope.displays = {};
      $scope.lang = null;

      $scope.profile = {
        name: '–',
        altitude: '–',
        code: '–',
        updateDate: null
      };

      $scope.$watch('profile', function(newValue, oldValue) {
        if (newValue !== null) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          angular.element(document.querySelector('.hour-rotating'))
            .addClass('animated flipInX ' + animationEnd).one(animationEnd, function() {
              angular.element(this).removeClass('animated flipInX');
          });
        }
      });

      $scope.position = {};

      $scope.progressbar = ngProgressFactory.createInstance();
      $scope.progressbar.setHeight('5px');
      $scope.progressbar.setColor('#dc0018');
      $scope.progressbar.set(0);

      // Setup the language
      if ($routeParams.language) {
        $scope.lang = $routeParams.language;
        $translate.use($routeParams.language);
        tmhDynamicLocale.set($routeParams.language);
      } else {
        tmhDynamicLocale.set('de');
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
              if (typeof response !== 'undefined' && response.status === -1) {
                directErrorRedirection();
              } else {
                redirectError();
              }
            });
        }
      }

      function refreshProfile () {
        $interval.cancel(stateInterval);

        // Retreive the profile and bootstrap the UI update
        webService.getProfile(updateLink, 
          function (response) {
            if (redirectErrorTimout !== null) {
              $timeout.cancel(redirectErrorTimout);
            }

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
            if (typeof response !== 'undefined' && response.status === -1) {
              directErrorRedirection();
            } else {
              redirectError();
            }
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

        // Complete the progress bar
        $scope.progressbar.complete();
        state = 1;
        $timeout(function() {
          stateInterval = $interval(progress, 500);
        }, 1500)
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
          name: profile.infos.name || profile.stnCode,
          code: profile.stnCode,
          altitude: profile.infos.altitude || ' – ',
          updateDate: profile.lastUpdate
        };
      }

      function redirectError () {
        // Wait 10 minutes befor redirect
        if (redirectErrorTimout === null) {
          redirectErrorTimout = $timeout(directErrorRedirection, 1000*60*10 );
        }
      }

      function directErrorRedirection () {
        // Clear intervals
        $interval.cancel(checkInterval);
        $interval.cancel(stateInterval);

        // Reset progressbar
        $scope.progressbar.set(num);

        // Redirect to the error page with the current
        // profile and language informations
        $location.path('/error' + $location.$$url);
      }

      function progress () {
        var num = 100/1250 * state;
        $scope.progressbar.set(num);
        state++;
      }

      // Setup the interval
      checkForUpdate();
      checkInterval = $interval(checkForUpdate, 1000*60);

    });
