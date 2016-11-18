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

    // Public API here
    return {
      getProfile: function (url, success, error) {
        $http({
          method: 'GET',
          url: url
        }).then(success, error);
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
