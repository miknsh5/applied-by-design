'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope) {


  $scope.scroll = 0;
  $scope.showIntro = true;
  
  if ( !Modernizr.touch ) { 
    $scope.fadeTitle = function () {
      return {
        'top': (-$scope.scroll / 3) + 'px',
        'opacity': 1 - ($scope.scroll / 500)
      };
    };
  }


  $scope.$watch('scroll', function(oldPos, newPos){
    // var $elem = $('#greeting');
    // if ($elem.length === 1) {
      if (newPos > 400 ){
        $scope.showIntro = false;
        // $elem.removeClass('anim-active');
        // $elem.css({'opacity': 0 });
      } else {
        $scope.showIntro = true;
        // $elem.addClass('anim-active');
        // $elem.css({'opacity': 1 });
      }
    
  });

});







