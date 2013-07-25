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
          loadedState: function(fleetModel, $q, $timeout){
            console.log('were waiting..............')
            var deferred = $q.defer();

            // this should start loading the resources
            // var fleetModelService = fleetModel;
            var waitForThese = [
              'airplanes',
              'cityPairs',
              'flights',
              'costcurves',
              'market',
              'services',
              'airports'
              ];

            $timeout(function(){
              //check to see if all of the data is loaded yet
              var status = 0;
              for (var i = 0; i<waitForThese.length; i++) {
                if (typeof waitForThese[i] == 'undefined') {status= status + 1;}
              }
              if (status != 0) {
                console.log('wiating for: ' + status + ' files...');
                deferred.resolve([]);
              } else {
                deferred.resolve(status);
                console.log('resolved')
              }
            }, 500);

            return deferred.promise;
          }
        }
        // resolve: {
        //   flights: function(fleetModel, $q){

        //       var deferred = $q.defer();

        //       $http({method: 'GET', url: 'images/full-data-model.json'})
        //           .success(function(data){
        //               deferred.resolve(data);
        //             })
        //           .error(function(data){
        //               deferred.reject(data);
        //               console.log('Resolve Error: data not loaded!');
        //             });

        //       return deferred.promise;
        //     }
        // }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
