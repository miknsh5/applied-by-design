'use strict';
/*global $:false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope) {

    $scope.activePanel = 0;

    $scope.showPanel = function(id){
      $scope.activePanel = id;
      clearInterval(timer);
    };

    $scope.scroll = 0;

    $scope.fadeTitle = function(){
      return {
        'margin-top': 200-($scope.scroll/3) + 'px',
        'opacity': 1-($scope.scroll/500)
      };
    };

    var timer;

    function playCarousel(){
      timer = setInterval(function(){
        var next = $scope.activePanel + 1;

        $scope.activePanel = next===3 ? 0 : next;
        $scope.$apply();
        console.log($scope.activePanel);
      }, 5000)
    }

    playCarousel();

    $('#about-btn').click(function (){
      $.scrollTo('#about-anchor',{duration: 'medium'});
    });

    $('#contact-btn').click(function (){
      $.scrollTo('#contact-anchor',{duration: 'medium'});
    });

  });





