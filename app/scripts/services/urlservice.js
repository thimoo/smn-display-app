'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.urlService
 * @description
 * # urlService
 * Factory in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .factory('urlService', function (urls) {
    // Service logic
    // ...

    // Public API here
    return {
      listProfilesUrl: function () {
        return urls.base + urls.profiles;
      },
      getProfileUrl: function (code) {
        return urls.base + urls.profiles + code;
      }
    };
  });
