'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.webService
 * @description
 * # webService
 * Factory in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .factory('webService', function ($http, urlService) {
    // Service logic
    // ...

    function retreiveProfile(code) {
      var url = urlService.getProfileUrl(code);
      return $http({
          method: 'GET',
          url: url
        });
    }

    // Public API here
    return {
      getProfile: function (code, success, error) {
        retreiveProfile(code)
          .then(success, error);
      },
      checkForUpdate: function (url, time, callback) {
        $http({
          method: 'GET',
          url: url + '/update',
          headers: {'X-Datetime': time}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            alert('an error occured');
          });
      },
      get: function (url, callback) {
        $http({
          method: 'GET',
          url: url
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            alert('an error occured');
          });
      },
      getMin: function (url, callback) {
        $http({
          method: 'GET',
          url: url,
          headers: {'agregator': 'min'}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            alert('an error occured');
          });
      },
      getMax: function (url, callback) {
        $http({
          method: 'GET',
          url: url,
          headers: {'agregator': 'max'}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            alert('an error occured');
          });
      }
    };
  });