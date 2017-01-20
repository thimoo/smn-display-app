'use strict';

/**
 * @ngdoc overview
 * @name swissMetNetDisplayApp
 * @description
 * # swissMetNetDisplayApp
 *
 * Main module of the application.
 */
angular
  .module('swissMetNetDisplayApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngSVGAttributes',
    'ngProgress',
  ])
  .config(function ($routeProvider, $locationProvider) {
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/home/:language?', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/error/:profile/:language?', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'error'
      })
      .when('/:profile/:language?', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });

    $translateProvider
      .preferredLanguage('de')
      .fallbackLanguage('de');
  })
  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
  });
