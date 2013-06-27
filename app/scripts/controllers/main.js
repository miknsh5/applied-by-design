'use strict';

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = ['hello', 'he', 'dsfg'];
      
      // scroll to the strategy section
      $("#nav-scroll-down").click(function (){
        $.scrollTo('#nav-scroll-down',{duration: 'medium', offsetTop: '0'});
          // $('html, body').animate({
          //     scrollTop: $("#strategy").offset().top
          //      }, 1000);
      });
    });
    // .controller('MainCtrl', function ($scope) {
        // $scope.test = 'hey';
        // $scope.triggerUpdate2 = function() {
        //     // $('.section-title').toggleClass(".section-title-hide");
        //     document.querySelector('.section-title').style.transition='margin-top 1s';
        //     document.querySelector('.section-title').style.marginTop=-110+'px';
        //     document.querySelector('.section-title').style.opacity='0';
        // }

        // $scope.triggerUpdate = function() {

        //     //trigger the DOM boolean here
        //     $scope.style_fade_dev = {'margin-top': '-110px', 'opacity':'0'};
        //     $scope.style_slide_dev = {'margin-top': '-110px', 'transition': 'margin-top 1s'};
        //     $scope.$apply();

        // }
      // });

    // // parallax
    //   function blockIconTrigger() {
    //     //Get current window scroll position
    //     windowScroll = $(this).scrollTop();

    //     //Slow scroll of .art-header-inner scroll and fade it out
    //     $artHeaderInner.css({
    //       'margin-top' : -(windowScroll/3)+"px",
    //       'opacity' : 1-(windowScroll/550)
    //     });

    //     //Slowly parallax the background of .art-header
    //     $artHeader.css({
    //       'background-position' : 'center ' + (-windowScroll/8)+"px"
    //     });

    //     //Fade the .nav out
    //     $nav.css({
    //       'opacity' : 1-(windowScroll/400)
    //     });
    //   }
  // });
