angular.module('bahnhof.directives')
.directive("bhAppLoading",function( ) {
  return({
    link: link,
    restrict: "C"
  });
  function link( scope, element, attributes ) {
    console.log ("observe directive");
    //scope.categories.then(function(){
      element.remove();
      //});
  }
 })