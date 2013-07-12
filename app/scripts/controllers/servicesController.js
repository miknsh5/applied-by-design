'use strict';

angular.module('appliedByDesignApp')
  .controller('ServicesCtrl', function ($scope) {
    $scope.test = 'hello';

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

  });
