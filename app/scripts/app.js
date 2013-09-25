'use strict';

angular.module('appliedByDesignApp', ['ngRoute', 'ngAnimate'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // .when('/services', {
        // templateUrl: 'views/services.html',
        // controller: 'ServicesCtrl'
      // })
      // .when('/solutions-brochure', {
        // templateUrl: 'views/brochure.html'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
