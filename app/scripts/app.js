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
    'tmh.dynamicLocale'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/:station/:language', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
  })
  .config(function ($translateProvider, de, en, fr, it) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('de', de)
      .translations('en', en)
      .translations('fr', fr)
      .translations('it', it)
      .preferredLanguage('en')
      .fallbackLanguage('en');
  });
