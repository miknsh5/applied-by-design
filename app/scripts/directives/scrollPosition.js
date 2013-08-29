'use strict';

angular.module('appliedByDesignApp')
  .directive('scrollPosition', function ($window) {
    return function (scope, element, attrs) {
        var windowEl = angular.element($window);
        windowEl.on('scroll', function(){
          scope.$apply(function() {
            scope[attrs.scrollPosition] = window.scrollY;
          });
        });
      };
  });
