angular.module('bahnhof.controllers', [])



.controller('bahnhofCtrl', function($scope, $stateParams, Categories) {
  $scope.categories = Categories.all();
})

.controller('HomeCtrl', function($scope, $document, Categories, Posts) {
})

.controller('CategoriesCtrl', function($scope, $stateParams, Categories) {
  $scope.categories.then(function(categories){
    $scope.categories = categories;
  });
})

.controller('CategoryCtrl', function($scope, $stateParams, Categories) {
  $scope.categories.then(function(categories){
    $scope.category = Categories.get($stateParams.categorySlug);
  });
})

.controller('PostCtrl', function($scope, $stateParams, Posts) {
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


  
  