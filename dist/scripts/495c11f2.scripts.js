"use strict";angular.module("appliedByDesignApp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/services",{templateUrl:"views/services.html",controller:"ServicesCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/blog",{templateUrl:"views/blog/index.html"}).when("/routemap",{templateUrl:"views/routemap.html",controller:"RoutemapCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("appliedByDesignApp").controller("MainCtrl",function(){screen.width>1e3&&skrollr.init({forceHeight:!1,smoothScrolling:!0}),$("#nav-arrow-1").click(function(){$.scrollTo("#strategy-anchor",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#design-anchor",{duration:"medium"})}),$("#nav-arrow-3").click(function(){$.scrollTo("#development-anchor",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})});var a;(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/BlackBerry/))&&(a=!0)}),angular.module("appliedByDesignApp").controller("AboutCtrl",["$scope",function(a){a.test="hello",screen.width>1e3&&skrollr.init({forceHeight:!1}),$("#nav-arrow-1").click(function(){$.scrollTo("#bio-anchor-1",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#bio-anchor-2",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})})}]),angular.module("appliedByDesignApp").controller("ServicesCtrl",["$scope",function(a){a.test="hello",screen.width>1e3&&skrollr.init({forceHeight:!1}),$("#nav-arrow-1").click(function(){$.scrollTo("#strategy-anchor",{duration:"medium"})}),$("#nav-arrow-2").click(function(){$.scrollTo("#design-anchor",{duration:"medium"})}),$("#nav-arrow-3").click(function(){$.scrollTo("#development-anchor",{duration:"medium"})}),$("#nav-arrow-4").click(function(){$.scrollTo("#contact-anchor",{duration:"medium"})})}]),angular.module("appliedByDesignApp").controller("ContactCtrl",["$scope",function(a){a.test="hello"}]),angular.module("appliedByDesignApp").controller("RoutemapCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("appliedByDesignApp").directive("worldMap",function(){return{template:"<div></div>",restrict:"E",scope:{width:"=",height:"="},link:function(a,b){var c=a.width,d=a.height,e=d3.geo.mercator().scale((c+1)/2/Math.PI).translate([c/2,d/2]).precision(.1),f=d3.geo.path().projection(e).pointRadius(function(a){return[a.radius]}),g=d3.select(b[0]).append("svg").attr("width",c).attr("height",d),h=g.append("g");d3.json("/images/world-50m.json",function(a,b){h.insert("path").datum(topojson.feature(b,b.objects.land)).attr("class","land").attr("d",f),h.insert("path").datum(topojson.mesh(b,b.objects.countries,function(a,b){return a!==b})).attr("class","boundary").attr("d",f),d3.json("/images/AS-flightLegs.json",function(a,b){h.selectAll("route").data(b).enter().append("path").datum(function(a){return{type:"LineString",coordinates:[[a.origin.longitude_deg,a.origin.latitude_deg],[a.destination.longitude_deg,a.destination.latitude_deg]]}}).attr("class","route").attr("fill","none").attr("stroke","blue").attr("stroke-width",3).attr("d",f)})})}}});