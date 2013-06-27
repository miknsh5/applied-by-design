'use strict';

angular.module('appliedByDesignApp')
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = ['hello', 'he', 'dsfg'];
      
      // scroll to the strategy section
      $('#nav-scroll-down').click(function (){
        $.scrollTo('#nav-scroll-down',{duration: 'medium', offsetTop: '0'});
      });
    });



