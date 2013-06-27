'use strict';

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {
        //main page controller
        //initialize visibility flag
        // $scope.style_title_dev = {'margin-top': '-59px', 'opacity':'1', 'transition': 'opacity 1s'};
        $scope.style_title_str = {};
        $scope.style_title_des = {};

        $scope.triggerUpdate2 = function() {
            // $('.section-title').toggleClass(".section-title-hide");
            document.querySelector('.section-title').style.transition="margin-top 1s";
            document.querySelector('.section-title').style.marginTop=-110+"px";
            document.querySelector('.section-title').style.opacity="0";
            // document.querySelector('.section-title').style.transition="opacity 1s";
            // document.querySelector('.section-title').toggleClass(".section-title-hide");
        }

        $scope.triggerUpdate = function() {

            //trigger the DOM boolean here
            $scope.style_fade_dev = {'margin-top': '-110px', 'opacity':'0'};
            $scope.style_slide_dev = {'margin-top': '-110px', 'transition': 'margin-top 1s'};
            $scope.$apply();

        }
    })
    .controller('MainSectionCtrl', function ($scope){
        // subpage controller for each section on the main page

        // setup a watch on the window scroll position
        // need to figure out when the icon blocks make it
        // to the center of the screen and then make the 
        // css update to trigger the css3 animations
        

    })    

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
