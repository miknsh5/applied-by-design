'use strict';

angular.module('appliedByDesignApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.test = 'hello';

    // initialize Skrollr - only if not on a tablet or mobile device
    if (screen.width > 1000){
      skrollr.init({forceHeight: false});
    }

    // smooth scroll to the bio 1
    $('#nav-arrow-1').click(function (){
      $.scrollTo('#bio-anchor-1',{duration: 'medium'});
    });
    // smooth scroll to the bio 2
    $('#nav-arrow-2').click(function (){
      $.scrollTo('#bio-anchor-2',{duration: 'medium'});
    });

    $('#nav-arrow-4').click(function (){
      $.scrollTo('#contact-anchor',{duration: 'medium'});
    });


  });
