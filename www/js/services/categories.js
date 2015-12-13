angular.module('bahnhof.services')


.factory('Categories', ['$filter', '$http', function($filter, $http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categories = [];

  return {
    all: function() {
      return $http.get("http://localhost:4567/categories").then(function(response){
        categories = response.data;
        return categories;
      });
    },
    get: function(slug) {
      return $filter('filter')(categories, {slug: slug}, true)[0];
    }
  }
}])


;
