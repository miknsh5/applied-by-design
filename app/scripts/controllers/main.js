'use strict';
/*global $:false */
/*jslint white: false */

angular.module('appliedByDesignApp')
  .controller('MainCtrl', function ($scope) {

  $scope.scroll = 0;

  $scope.fadeTitle = function () {
    return {
      'top': ($scope.scroll / 3) + 'px',
      'opacity': 1 - ($scope.scroll / 500)
    };
  };

  $('#scroll-btn').click(function () {
    $.scrollTo('#scroll-anchor', {duration: 'medium'});
  });

  $('#services-btn').click(function () {
    $.scrollTo('#services-anchor', {duration: 'medium'});
  });

  $('#about-btn').click(function () {
    $.scrollTo('#about-anchor', {duration: 'medium'});
  });

  $('#contact-btn').click(function () {
    $.scrollTo('#contact-anchor', {duration: 'medium'});
  });
});


function isElementInViewport(elem) {
  var $elem = $(elem);

  // Get the scroll position of the page.
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html');
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  // Get the position of the element on the page.
  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();
  // console.log(viewportTop)

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
  }
}

function checkGreetingVis(item) {
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();

    var $elem = $(item);

    if (viewportTop > 1000 ) {
        // remove the class to hide the element
        $elem.removeClass('anim-active');
        $elem.css({'opacity': 0});
    } else {
        // add the anim class back so it's visibile at the top
        $elem.addClass('anim-active');
        $elem.css({'opacity': 1});
    }
}

// function overrideAnim(item) {
//     var $elem = $(item);

//     $elem.addClass('anim-active');
// }


// Capture scroll events
$(window).scroll(function () {
  checkGreetingVis('.greeting');
  // checkAnimation('.dg1');
  // checkAnimation('.fade-in-0');
  // checkAnimation('.fade-in-1');
  // checkAnimation('.fade-in-2');
  // checkAnimation('.fade-in-3');
  // checkAnimation('.fade-in-4');
  // checkAnimation('.fade-in-5');
  checkAnimation('.fade-in-6');
  checkAnimation('.fade-in-7');
  // checkAnimation('.bubble');
  // checkAnimation('.solution');
  // checkGreetingVis('.greeting');
});

// checkAnimation('.fade-in-0');
// checkAnimation('.dg1');

function resize() {
  var heights = window.innerHeight;
  document.getElementById('landing').style.height = heights + 'px';
  document.getElementById('first-section').style.marginTop = heights + 'px';
  document.getElementById('scroll-btn').style.bottom = 60 + 'px';
  var content = $('.greeting');
  content.css({'margin-top': heights * 0.40 + 'px'});
}
resize();

window.onresize = function () {
  resize();
};


