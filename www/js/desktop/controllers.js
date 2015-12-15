angular.module('bahnhof.controllers', [])



.controller('bahnhofCtrl', function($scope, $stateParams, Categories) {
  $scope.categories = Categories.all();
})

.controller('HomeCtrl', function($scope, $document, Categories, Posts) {
})

.controller('CategoriesCtrl', function($scope, $location, $stateParams, Categories) {
  $scope.isActive = function(route) {
    return route === $location.path();
  }
  $scope.categories.then(function(categories){
    $scope.categories = categories;
  });
})

.controller('CategoryCtrl', function($scope, $stateParams, Categories, Posts) {
  
  function load(page) {
    
    var limit = 20;
    var offset = limit * (page - 1);
    var isComplete = $scope.pagination && $scope.pagination.current_page >= $scope.pagination.total_pages;
    
    if (!isComplete) {
      
      $scope.loading = true;
    
      $scope.categories.then(function(){
        $scope.category = Categories.get($stateParams.categorySlug);
      
        Posts.getbyCategory($scope.category.id, offset, limit).then(function(response){
          $scope.pagination = angular.fromJson(response.headers('x-pagination'));
          $scope.posts = $scope.posts || [];
          Array.prototype.push.apply($scope.posts, response.data);
          $scope.loading = false;
        });
      });
    };
  };
  
  $scope.$on('endlessScroll:next', function() {
    var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;
    load(page);
  });
  
  load($stateParams.page ? parseInt($stateParams.page, 10) : 1);
})

.controller('PostCtrl', function($scope, $stateParams, Posts) {
})

.controller('HomeCategoryCtrl', function($scope, $document, Categories, Posts) {
  $scope.get = function(categorySlug, limit) {
  $scope.categories.then(function(){
    $scope.category = Categories.get(categorySlug);
    Posts.getbyCategory($scope.category.id, 0, limit).then(function(response){
      $scope.posts = response.data;
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

.controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});


  
  