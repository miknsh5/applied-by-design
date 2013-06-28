'use strict';

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = ['hello', 'he', 'dsfg'];

      // scroll to the strategy section
      $('#nav-scroll-down').click(function (){
        $.scrollTo('#nav-scroll-down',{duration: 'medium', offsetTop: '0'});
      });


      // initialize icon visibilities
      $scope.isStVisible = false;
      $scope.isDsVisible = false;
      $scope.isDvVisible = false;

      $scope.toggleState = function(){
        $scope.isStVisible = !$scope.isStVisible;
        if ($scope.isStVisible) {
          $('.block-lg').css({'width': '240px'});
          $('.long-title').css({'opacity': 1});
          $('.short-title').css({'opacity': 0});
        } else {
          $('.block-lg').css({'width': '80px'});
          $('.long-title').css({'opacity': 0});
          $('.short-title').css({'opacity': 1});
        }

      };

    });
