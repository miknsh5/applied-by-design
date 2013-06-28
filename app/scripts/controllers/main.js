'use strict';
/*global $:false */

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {

      // smooth scroll to the strategy section
      $('#nav-scroll-down').click(function (){
        $.scrollTo('#nav-scroll-down',{duration: 'medium', offsetTop: '0'});
      });

      //Disable for launch - goofy in IE8
      // // initialize icon visibilities
      // $scope.isStVisible = false;
      // $scope.isDsVisible = false;
      // $scope.isDvVisible = false;

      // // toggle the size of the section icons
      // $scope.toggleState = function(){
      //   $scope.isStVisible = !$scope.isStVisible;
      //   if ($scope.isStVisible) {
      //     $('.block-dynamic').css({'width': '240px'});
      //     $('.short-title').css({'opacity': 0});
      //     $('.long-title').css({'opacity': 1});
      //   } else {
      //     $('.block-dynamic').css({'width': '80px'});
      //     $('.short-title').css({'opacity': 1});
      //     $('.long-title').css({'opacity': 0});
      //   }
      // };
      // $scope.toggleState();


      // var isMobile;

      // //figure out which platform the user's on
      // if( navigator.userAgent.match(/Android/i) ||
      //     navigator.userAgent.match(/webOS/i) ||
      //     navigator.userAgent.match(/iPhone/i) ||
      //     navigator.userAgent.match(/iPod/i) ||
      //     navigator.userAgent.match(/iPad/i) ||
      //     navigator.userAgent.match(/BlackBerry/)
      // ){
      //   isMobile = true;
      // }

      // var $strategy = $('section.strategy');
      // var $design = $('section.design');
      // var $development = $('section.development');
      // var $summary = $('section.summary');
      // var windowScroll;

      // // Check window width - if less than 1000px disable parallax
      // function isLargeViewport() {
      //   if($(window).width() < 979) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }

      // // initialize the margin-tops to '0'.  Only adjust if browser passes
      // $strategy.css({
      //   'margin-top' : '0px'
      // });
      // $design.css({
      //   'margin-top' : '0px'
      // });
      // $development.css({
      //   'margin-top' : '0px'
      // });
      // $summary.css({
      //   'margin-top' : '0px'
      // });

      // // recalc parallax offsets if window size changes
      // $(window).resize(function() {
      //     parallaxify();
      //   });

      // // If large viewport and not mobile, parallax the sections
      // if(!isMobile) {
      //   $(window).scroll(function() {
      //     if(isLargeViewport()) {
      //       parallaxify();
      //     }
      //   });
      // }


      // function parallaxify() {
      //   // margin-top shims to compensate for parallax as you progress further down the page 
      //   var strategyShim = -20;
      //   var designShim = 75;
      //   var developmentShim = 150;
      //   var summaryShim = 225;

      //   //Get scroll position of window
      //   windowScroll = $(window).scrollTop();
      //   var plaxFactor = 4;
      //   //parallax the content section in front of the images
      //   $strategy.css({
      //     'margin-top' : (-windowScroll/plaxFactor + strategyShim)+'px'
      //   });
      //   $design.css({
      //     'margin-top' : (-windowScroll/plaxFactor + designShim)+'px'
      //   });
      //   $development.css({
      //     'margin-top' : (-windowScroll/plaxFactor + developmentShim)+'px'
      //   });
      //   $summary.css({
      //     'margin-top' : (-windowScroll/plaxFactor + summaryShim)+'px'
      //   });
      // }

    });




