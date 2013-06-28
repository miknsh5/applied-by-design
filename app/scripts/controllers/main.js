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




    var $strategy = $('section.strategy');
    var $design = $('section.design');
    var $development = $('section.development');
    var $summary = $('section.summary');
    var windowScroll;
    var isMobile = false;

    // Identify if visitor has a large enough viewport for parallaxing title
    function isLargeViewport() {
        return true;
    }

    // If large viewport and not mobile, parallax the title
    if(!isMobile) {
      $(window).scroll(function() {
        if(isLargeViewport()) {
          parallaxify();
        }
      });
    }

    // margin-top shims to compensate for parallax as you progress further down the page 
    var strategyShim = -20;
    var designShim = 75;
    var developmentShim = 150;
    var summaryShim = 225;

    function parallaxify() {
      //Get scroll position of window
      windowScroll = $(window).scrollTop();
      var plaxFactor = 4;
      //parallax the content section in front of the images
      $strategy.css({
        'margin-top' : (-windowScroll/plaxFactor + strategyShim)+"px"
      });
      $design.css({
        'margin-top' : (-windowScroll/plaxFactor + designShim)+"px"
      });
      $development.css({
        'margin-top' : (-windowScroll/plaxFactor + developmentShim)+"px"
      });
      $summary.css({
        'margin-top' : (-windowScroll/plaxFactor + summaryShim)+"px"
      });
    }

  });




