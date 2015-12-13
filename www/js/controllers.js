angular.module('bahnhof.controllers', [])

.controller('NavCtrl', function($scope, $stateParams, Categories) {
  Categories.all().then(function(categories){
    $scope.categories = categories;
  });
})


.controller('HomeCtrl', function($scope, $document, Categories, Posts) {
  $scope.categories = Categories.all();
})

.controller('HomeCategoryCtrl', function($scope, $document, Categories, Posts) {
  $scope.get = function(categorySlug, limit) {
  $scope.categories.then(function(){
    $scope.category = Categories.get(categorySlug)
    Posts.getbyCategory($scope.category.id, 0, limit).then(function(posts){
      $scope.posts = posts;
      if (categorySlug == 'spotlight') {
        $document.ready(function() { 
          $('.flexslider').flexslider({
              animation: "slide"
            });
        });
      }
    });    
  }); 
 };
})


  
  