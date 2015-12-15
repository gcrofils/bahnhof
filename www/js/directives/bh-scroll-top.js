angular.module('bahnhof.directives')

.directive("bhScrollTop", function ($window) {
  
  return function($scope, element, attrs) {
    console.log("bhScrollTop");
    console.log($scope);
    console.log($scope.minifyNavbar);
    
    var pageYOffset;
    pageYOffset = parseInt(attrs.bhScrollTop);
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= pageYOffset) {
        $scope.minifyNavbar = true;
      } else {
        $scope.minifyNavbar = false;
      }
      $scope.$apply();
    });
  };
})