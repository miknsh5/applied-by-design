'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope, $state) {

  $scope.scroll = 0;
  $scope.showIntro = true;
  
  if ( !Modernizr.touch ) { 
    $scope.fadeTitle = function () {
      return {
        'margin-top': (window.innerHeight / 4 + $scope.scroll / 1.5) + 'px',
        'opacity': 1 - ($scope.scroll / 250)
      };
    };
  }


  $scope.$watch('scroll', function(oldPos, newPos){
      if (newPos > 600 ){
        $scope.showIntro = false;
      } else {
        $scope.showIntro = true;
      }
    
  });

});







