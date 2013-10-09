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
        // console.log($scope.activePanel);
      }, 7000);
    }

    playCarousel();

    $('#about-btn').click(function (){
      $.scrollTo('#about-anchor',{duration: 'medium'});
    });

    $('#contact-btn').click(function (){
      $.scrollTo('#contact-anchor',{duration: 'medium'});
    });

    $('#services-btn').click(function (){
      $.scrollTo('#services-anchor',{duration: 'medium'});
    });

  });


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation(item) {
    var $elem = $(item);

    // If the animation has already been started
    // if ($elem.hasClass('anim-active')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('anim-active');
    } else {
        $elem.removeClass('anim-active');

    }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation('.dg1');
    checkAnimation('.con1');
    checkAnimation('.con2');
    checkAnimation('.con3');
    checkAnimation('.con4');
    checkAnimation('.con5');
    checkAnimation('.con6');
    checkAnimation('.fade-in-0');
    checkAnimation('.fade-in-1');
    checkAnimation('.fade-in-2');
    checkAnimation('.fade-in-3');
    checkAnimation('.fade-in-4');
    checkAnimation('.fade-in-5');
    checkAnimation('.fade-in-6');
    checkAnimation('.bubble');
    checkAnimation('.solution');
});
checkAnimation('.fade-in-0');
