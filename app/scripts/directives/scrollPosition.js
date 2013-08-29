'use strict';

angular.module('appliedByDesignApp')
  .directive('scrollPosition', function ($window) {
    return function (scope, element, attrs) {
        var windowEl = angular.element($window);
        windowEl.on('scroll', function(){
          // console.log('scroll!')
          scope.$apply(function() {
            scope[attrs.scrollPosition] = window.scrollY;
          })
        })
      }
  });


  // app.directive('scrollPosition', function($window) {
  //   return function(scope, element, attrs) {
  //     var windowEl = angular.element($window);
  //     windowEl.on('scroll', function() {
  //       scope.$apply(function() {
  //         scope[attrs.scrollPosition] = windowEl.scrollTop();
  //       });
  //     });
  //   };
  // });