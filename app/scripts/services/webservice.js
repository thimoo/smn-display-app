'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.webService
 * @description
 * # webService
 * Factory in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .factory('webService', function ($http) {

    // Return the service public API to
    // communicate with the REST server
    return {

      // Get the profile
      getProfile: function (url, success, error) {
        $http({
          method: 'GET',
          url: url
        }).then(success, error);
      },

      // Call the update url for the profile given
      // and add the X-Datetime header
      checkForUpdate: function (url, time, callback, errorCallback) {
        $http({
          method: 'GET',
          url: url + '/update',
          headers: {'X-Datetime': time}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            errorCallback(response);
          });
      },

      // Make a GET request on the url
      get: function (url, callback) {
        $http({
          method: 'GET',
          url: url
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            console.log(response);
          });
      },

      // Make a GET request on the url and
      // add an agregator header equals to
      // min
      getMin: function (url, callback) {
        $http({
          method: 'GET',
          url: url,
          headers: {'agregator': 'min'}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            console.log(response);
          });
      },

      // Make a GET request on the url and
      // add an agregator header equals to
      // max
      getMax: function (url, callback) {
        $http({
          method: 'GET',
          url: url,
          headers: {'agregator': 'max'}
        }).then(
          function (response) {
            callback(response.data.data);
          }, function (response) {
            console.log(response);
          });
      }
    };
  });
