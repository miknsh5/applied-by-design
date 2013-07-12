'use strict';
/*global $:false */

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {

      // initialize Skrollr - only if not on a tablet or mobile device
      if (screen.width > 1000){
        skrollr.init({forceHeight: false});
      }

      // smooth scroll to the strategy section
      $('#nav-arrow-1').click(function (){
        $.scrollTo('#strategy-anchor',{duration: 'medium'});
      });

      $('#nav-arrow-2').click(function (){
        $.scrollTo('#design-anchor',{duration: 'medium'});
      });

      $('#nav-arrow-3').click(function (){
        $.scrollTo('#development-anchor',{duration: 'medium'});
      });

      $('#nav-arrow-4').click(function (){
        $.scrollTo('#contact-anchor',{duration: 'medium'});
      });

      //Disable for launch - goofy in IE8
      // initialize icon visibilities
      $scope.isStVisible = false;
      $scope.isDsVisible = false;
      $scope.isDvVisible = false;

      // toggle the size of the section icons
      $scope.toggleState = function(){
        $scope.isStVisible = !$scope.isStVisible;
        if ($scope.isStVisible) {
          $('.block-dynamic').css({'width': '240px'});
          $('.short-title').css({'opacity': 0});
          $('.long-title').css({'opacity': 1});
        } else {
          $('.block-dynamic').css({'width': '80px'});
          $('.short-title').css({'opacity': 1});
          $('.long-title').css({'opacity': 0});
        }
      };
      $scope.toggleState();


      var isMobile;

      //figure out which platform the user's on
      if( navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/webOS/i) ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPod/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/BlackBerry/)
      ){
        isMobile = true;
      }


    });




