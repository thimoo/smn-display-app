'use strict';

/**
 * @ngdoc service
 * @name swissMetNetDisplayApp.dependencyService
 * @description
 * # dependencyService
 * Service in the swissMetNetDisplayApp.
 */
angular.module('swissMetNetDisplayApp')
  .service('dependencyService', function () {

    var reversedData = [];
    var reversedCollections = [];

    var toFlatArray = function (array) {
      var res = [];
      angular.forEach(array, function (value) {
        res.push(value.code);
      });
      return res;
    };

    var search = function (type, value) {
      switch (type) {
        case 'data': return reversedData.indexOf(value) !== -1;
        case 'collections': return reversedCollections.indexOf(value) !== -1;
      } 
    };

    this.check = function (directive, dependencies, profile) {
      var status = true;

      reversedData = toFlatArray(profile.data);
      reversedCollections = toFlatArray(profile.collections);

      angular.forEach(dependencies, function (dependency) {
        
        var source = dependency.split('-');
        if (! search(source[0], source[1])) {
          status = false;
        }

      });
      return status;
    };
    
    this.reverseToObject = function (array) {
      var res = {};
      angular.forEach(array, function (value) {
        res[value.code] = value.$href;
      });
      return res;
    };

    this.getUrls = function (dependencies, profile) {
      var urls = {
        data: {},
        collections: {}
      };

      var profileUrls = {
        data: this.reverseToObject(profile.data),
        collections: this.reverseToObject(profile.collections)
      };

      angular.forEach(dependencies, function (dependency) {
        
        var source = dependency.split('-');

        urls[source[0]][source[1]] = profileUrls[source[0]][source[1]];

      });
      return urls;
    };

  });
