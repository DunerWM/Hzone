/*! Hzone 2015-07-21 */
var globalM=angular.module("myapp",[]);globalM.controller("stateFormCtrl",function(a,b){a.state={content:null},a.stateSubmit=function(){console.log(a.content),b({method:"post",url:"/state/send",data:a.state,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(a){console.log(a.success?a:a.message)})}});