angular.module('bahnhof.services')



.factory('Posts', ['$filter', '$http',  function($filter, $http) {

  posts = [];
  
  api_endpoint = 'http://localhost:4567/posts'

  return {
    
    all: function(){
      return $http.get(api_endpoint).then(function(response){
        posts = response.data;
        return posts;
      });
    },
    
    get: function(slug) {
      return $filter('filter')(posts, {slug: slug}, true)[0];
    },
    getbyCategory: function(categoryId, offset, limit) {
      //return $filter('filter')(posts, {category_id: categoryId}, true);
      return $http({
          url: api_endpoint, 
          method: "GET",
          params: {category_id: categoryId, offset: offset, limit: limit}
       }).then(function(response){
        posts = response.data;
        return posts;
      });
    }
  }
}])
;
