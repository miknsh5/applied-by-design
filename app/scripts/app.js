'use strict';

angular.module('appliedByDesignApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/services', {
        templateUrl: 'views/services.html',
        controller: 'ServicesCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog/index.html'
      })
      .when('/routemap', {
        templateUrl: 'views/routemap.html',
        controller: 'RoutemapCtrl',
        resolve: { 
          fleetRouteData: function($http, $q){

              var deferred = $q.defer();

              $http({method: 'GET', url: 'images/full-data-model.json'})
                  .success(function(data){
                      deferred.resolve(data);
                  })
                  .error(function(data){
                      deferred.reject(data);
                      console.log('Resolve Error: data not loaded!');
                  });

              return deferred.promise;
            }
          }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
