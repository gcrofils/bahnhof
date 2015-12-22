angular.module('bahnhof.controllers', [])



.controller('bahnhofCtrl', function($scope, $stateParams, Categories) {
  $scope.categories = []
  Categories.all().then(function(categories){
    $scope.categories = categories;
  })
})

.controller('HomeCtrl', function($scope, $filter, Categories, Posts) {
  
  searchString = function(categories) {
    var c = {spotlight: 5, business: 2, policy: 1, industry: 3, internet: 3, society: 3, column: 4, oneroadonebelt: 1, environment: 1};
    var q = [];
    //if (angular.isArray($scope.categories)) {
      angular.forEach(c, function(num, slug) {
        category = Categories.get(slug);
        q.push(category.id + ',' + num);
      });
      return q.join('|');
    //}
  }
  
  myPosts = function(searchString) {
    if (angular.isArray($scope.homePosts))
      return $scope.homePosts;
    if (angular.isUndefined($scope.homePosts))
      $scope.homePosts = Posts.search(searchString);
    if ($scope.homePosts && angular.isFunction($scope.homePosts.then)) {
      return $scope.homePosts.then(function(response) {
        $scope.homePosts = response.data;
        return response.data;
      })
    }
  }

    
  
  $scope.get = function(categorySlug){
    if ($scope.categories.length > 0) {
      
      var category = $filter('filter')($scope.categories, {slug: categorySlug}, true)[0];
      
      data = {
        category: category
      }
      
      posts = myPosts(searchString($scope.categories));
      if ($scope.homePosts && angular.isFunction($scope.homePosts.then)) {
        $scope.homePosts.then(function(response) {
          posts = response.data;
          console.log(category.id);
          data['posts']= $filter('filter')(posts, {category_id: category.id}, true);
          return data;
        })
      } else {
        data['posts']= $filter('filter')(posts, {category_id: category.id}, true);
        return data;
      }
      

      
    }
    
  }
  
  
  $scope.get_category = function (categorySlug) {
    var c = {} 
    if (angular.isArray($scope.categories)) {
      c = $filter('filter')($scope.categories, {slug: categorySlug}, true)[0]
    }
    return c;
  }
  
})

.controller('HomeCategoryCtrl', function($scope, $filter) {
  debugger
  $scope.get = function(categorySlug, limit) {
    $scope.posts = $filter('filter')($scope.homePosts, {category_id: 0}, true);
  }
})

// .controller('HomeCategoryCtrl', function($scope, $document, Categories, Posts) {
//   $scope.loading = true;
//   $scope.get = function(categorySlug, limit) {
//   $scope.categories.then(function(){
//     $scope.category = Categories.get(categorySlug);
//     Posts.getbyCategory($scope.category.id, 0, limit).then(function(response){
//       $scope.posts = response.data;
//       if (categorySlug == 'spotlight') {
//         $document.ready(function() {
//           $('.flexslider').flexslider({
//               animation: "slide"
//             });
//         });
//       }
//       $scope.loading = false;
//     }), function (response) {
//       console.log ('HomeCategoryCtrl ERROR');
//       console.log (response);
//   };
//   });
//  };
// })



.controller('CategoryCtrl', function($scope, $stateParams, Categories, Posts) {
  
  function load(page) {
    
    var limit = 15;
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


  
  