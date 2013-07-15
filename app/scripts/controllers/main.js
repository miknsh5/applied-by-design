'use strict';
/*global $:false */

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {

      // initialize Skrollr - only if not on a tablet or mobile device
      if (screen.width > 1000){
        skrollr.init({
          forceHeight: false,
          smoothScrolling: true
        });
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




