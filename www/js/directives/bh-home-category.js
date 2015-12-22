angular.module('bahnhof.directives')

.directive("bhHomeCategory", ['$filter', function( $filter ) {
  return({
    link: link,
    restrict: "E",
    templateUrl: template,
    controller: ['$scope', function($scope) { 
      //console.log($scope.categories);
  this.posts = function(){
    return {a: 1, b:2}
  }
}],
    scope: {
    },
  });
  
   // function template( element, attributes) {
//      var tpl = '<p>Inside <b>Template</b></p><ul><li>LABEL: {{category.label}}</li></ul>';
//      return tpl;
//    };



  
   function template( element, attributes) {
     return '/templates/directives/home-category-' + attributes.template + '.html';
   };
  
  function link( scope, element, attributes, controllers ) {

    attributes.$observe('bhData', function (data) {
      if (data != '') {
        obj = angular.fromJson(data);
        scope.category = obj.category;
        scope.posts = obj.posts;
        element.removeAttr('bh-data');
      }
    });
    
    // console.log($scope.categories);
//     scope.categories.then(function(categories){
//       console.log(scope.category);
//       scope.category = $filter('filter')(categories, {slug: attributes.slug}, true)[0];
//       console.log(scope.category);
//     });
    // var vars, key, value;
//     vars = scope.bhIncludeParams();
//     for (key in vars) {
//       value = vars[key];
//       scope[key] = value;
//     }
  };
 }])

