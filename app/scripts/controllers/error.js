'use strict';

/**
 * @ngdoc function
 * @name swissMetNetDisplayApp.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller of the swissMetNetDisplayApp
 */
angular.module('swissMetNetDisplayApp')
  .controller('ErrorCtrl', function (
    $interval, 
    $location, 
    $routeParams, 
    $translate, 
    tmhDynamicLocale, 
    urlService, 
    webService) {

      // Setup the url for the profile
      var urlToCheck = urlService.getProfileUrl($routeParams.profile);

      // Setup the language
      if ($routeParams.language) {
        $translate.use($routeParams.language);
        tmhDynamicLocale.set($routeParams.language);
      }

      checkNetwork();
      var checkInterval = $interval(checkNetwork, 5000);

      // If the connection to the network is available
      // and the profile is online, then we can redirect
      // to the profile page
      function checkNetwork () {

        webService.getProfile(urlToCheck, 
          function (response) {
            // Check if the profile is online
            if (response.data.data.isOnline) {
              // Clear the interval used to check the
              // connection
              $interval.cancel(checkInterval);
              
              // Compute and redirect to the profile page
              // and reset the language
              var urlToRedirect = $routeParams.language ? 
                '/' + $routeParams.profile + '/' + $routeParams.language 
                : '/' + $routeParams.profile;
              $location.path(urlToRedirect);
            }
          });
      }

    });
