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
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        // .state('company', {
        //   url: '/company',
        //   templateUrl: 'views/main.company.html'
        // })
        .state('work', {
          url: '/work',
          templateUrl: 'views/work.html',
          controller: 'WorkCtrl'
        })

        // .state('service', {
        //   url: '^/home#services-anchor',
        //   templateUrl: 'views/main.html',
        //   controller: 'MainCtrl'
        // })

        // .state('contact', {
        //   url: '^/home#contact-anchor',
        //   templateUrl: 'views/main.html',
        //   controller: 'MainCtrl'
        // })

        // .state('home2', {
        //   url: '/home/work',
        //   views: {
        //     "services": { templateUrl: "views/main.home.html" },
        //     "contact": { templateUrl: "views/main.contact.html" },
        //     "work": { templateUrl: "views/main.work.html" }
        // })



        // .state('study1', {
        //   url: '/airline-fleet-demo',
        //   parent: 'work',
        //   views: {
        //     // "header": { templateUrl: "views/work.header.html" },
        //     "case": { 
        //       templateUrl: "views/work.caseStudy.html"
        //      }
        //   }
        // })

    });
