'use strict';

angular.module('appliedByDesignApp', ['ngAnimate', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $uiViewScrollProvider) {
    
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/home');
    $uiViewScrollProvider.useAnchorScroll();

    // Now set up the states
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/main.home.html',
          controller: 'MainCtrl'
        })
        .state('company', {
          url: '/company',
          templateUrl: 'views/main.company.html'
        })
        .state('work', {
          url: '/work',
          templateUrl: 'views/work.html'
        })
        .state('study1', {
          url: '/work/airline-fleet-demo',
          parent: 'work',
          views: {
            // "header": { templateUrl: "views/work.header.html" },
            "case": { templateUrl: "views/work.caseStudy.html" }
          }
          // templateUrl: 'views/work.airlineDashboard.html'
        })

    });
