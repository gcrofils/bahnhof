angular.module('bahnhof.directives')
.directive("bhAppLoading",function( ) {
  return({
    link: link,
    restrict: "C"
  });
  function link( scope, element, attributes ) {
    scope.categories.then(function(){
      element.remove();
    });
  }
 })