'use strict';

angular.module('appliedByDesignApp')
  .directive('scrollPosition', function ($window) {
    return function (scope, element, attrs) {
        var windowEl = angular.element($window);
        windowEl.on('scroll', function(){
          scope.$apply(function() {
            scope[attrs.scrollPosition] = window.scrollY;
          });
        });

        if ( !Modernizr.touch ) { 
          windowEl.on('resize', function(){
            scope.$apply(function(){
              resize();
            })
          })
        }

        var resize = function(){
          var heights = window.innerHeight;

          var $landing = $('#landing');
          var $section1 = $('#first-section');
          var $greeting = $('#greeting');

          if ($landing.length === 1) { $landing.css({'height': heights + 'px'});}
          if ($section1.length === 1) { $section1.css({'margin-top': heights + 'px'});}

          if (!Modernizr.touch) {
            if ($greeting.length === 1) { $greeting.css({'margin-top': heights * 0.25 + 'px'});}
          }
        }

        resize();
      };
  })

  .directive('scrollOnClick', function () {
  return {
    restrict: 'A',
    // scope: {},
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
     
      $elm.on('click', function(myState) {
        var $target;
        if (idToScroll) {
          // console.log('scrolltotarget:' + idToScroll);
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        
        if ($target.length === 1){
          $("body,html").animate({scrollTop: $target.offset().top}, "slow");
        } 

      });
    }
  }
});