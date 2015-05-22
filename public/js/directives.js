(function() {

  var app = angular.module('afxClothing');

  app.directive('productBox', function() {
    return {
      restrict: 'E',
      templateUrl:'views/partials/productBox.html'
    };
  });

  app.directive('shoppingCart', function() {
    return {
      restrict:'E',
      templateUrl:'views/partials/shoppingCart.html'
    };
  });

  app.directive('genderSelect', function() {
    return {
      restrict:'E',
      templateUrl:'views/partials/genderSelect.html'
    };
  });

  app.directive('mensCategories', function() {
    return {
      restrict: 'E',
      templateUrl:'views/partials/mensCategories.html'
    };
  });

  app.directive('womensCategories', function() {
    return {
      restrict: 'E',
      templateUrl:'views/partials/womensCategories.html'
    };
  });

}());
