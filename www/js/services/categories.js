angular.module('bahnhof.services')


.factory('Categories', ['$filter', '$http', 'ENV', function($filter, $http, ENV) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categories = [];
  
  var categories_endpoint = ENV.apiEndpoint + "categories"

  return {
    all: function() {
      return $http.get(categories_endpoint).then(function(response){
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
