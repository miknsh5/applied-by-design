"use strict";angular.module("appliedByDesignApp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/services",{templateUrl:"views/services.html",controller:"ServicesCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/blog",{templateUrl:"views/blog/index.html"}).otherwise({redirectTo:"/"})}]),angular.module("appliedByDesignApp").controller("MainCtrl",function(){screen.width>1e3&&skrollr.init({forceHeight:!1,smoothScrolling:!0}),$("#nav-arrow-1").click(function(){$.scrollTo("#strategy-anchor",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#design-anchor",{duration:"medium"})}),$("#nav-arrow-3").click(function(){$.scrollTo("#development-anchor",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})});var a;(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/BlackBerry/))&&(a=!0)}),angular.module("appliedByDesignApp").controller("AboutCtrl",["$scope",function(a){a.test="hello",screen.width>1e3&&skrollr.init({forceHeight:!1}),$("#nav-arrow-1").click(function(){$.scrollTo("#bio-anchor-1",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#bio-anchor-2",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})})}]),angular.module("appliedByDesignApp").controller("ServicesCtrl",["$scope",function(a){a.test="hello",screen.width>1e3&&skrollr.init({forceHeight:!1}),$("#nav-arrow-1").click(function(){$.scrollTo("#strategy-anchor",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#design-anchor",{duration:"medium"})}),$("#nav-arrow-3").click(function(){$.scrollTo("#development-anchor",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})})}]),angular.module("appliedByDesignApp").controller("ContactCtrl",["$scope",function(a){a.test="hello"}]);