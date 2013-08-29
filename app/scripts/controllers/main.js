'use strict';
/*global $:false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope) {

    $scope.activePanel = 0;

    $scope.showPanel = function(id){
      $scope.activePanel = id;
    };

    $scope.scroll = 0;

    $scope.fadeTitle = function(){
      return {
        'margin-top': 200-($scope.scroll/3) + 'px',
        'opacity': 1-($scope.scroll/500)
      };
    };


    $('#about-btn').click(function (){
      $.scrollTo('#about-anchor',{duration: 'medium'});
    });

    $('#contact-btn').click(function (){
      $.scrollTo('#contact-anchor',{duration: 'medium'});
    });

  });





