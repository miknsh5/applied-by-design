'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope, $state) {

  $scope.scroll = 0;
  $scope.showIntro = true;
  
  if ( !Modernizr.touch ) { 
    $scope.fadeTitle = function () {
      console.log($scope.scroll);
      return {
        'margin-top': (window.innerHeight / 4 + $scope.scroll / 1.5) + 'px',
        'opacity': 1 - ($scope.scroll / 250)
      };
    };
  }


  $scope.$watch('scroll', function(oldPos, newPos){
    // var $elem = $('#greeting');
    // if ($elem.length === 1) {
      if (newPos > 600 ){
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







