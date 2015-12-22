angular.module('bahnhof.services')



.factory('Posts', ['$filter', '$http', '$q', 'ENV',  function($filter, $http, $q, ENV) {

  var posts = [];
  
  var posts_endpoint = ENV.apiEndpoint + "posts";

  return {
    
    all: function(){
      return $http.get(posts_endpoint).then(function(response){
        posts = response.data;
        return posts;
      });
    },
    
    getBySlug: function(slug) {
      post = $filter('filter')(posts, {slug: slug}, true)
      if (post.length == 1) {
        return $q(function(resolve, reject) {
            resolve(post[0]);
          })
      } else {
        return $http({
            url: posts_endpoint + '/' + slug, 
            method: "GET"
         }).then(function(response){
          return response.data.post[0];
        });
      }
    },
    
    get: function(slug) {
      return $filter('filter')(posts, {slug: slug}, true)[0];
    },
    
    search: function(search) {
      return $http({
          url: posts_endpoint, 
          method: "GET",
          params: {q: search}
       }).then(function(response){
        posts = response.data;
        return response;
      });
    },
    
    getbyCategory: function(categoryId, offset, limit) {
      //return $filter('filter')(posts, {category_id: categoryId}, true);
      return $http({
          url: posts_endpoint, 
          method: "GET",
          params: {category_id: categoryId, offset: offset, limit: limit}
       }).then(function(response){
        posts = response.data;
        return response;
      });
    }
  }
}])
;
