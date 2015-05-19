(function() {

  var app = angular.module('afxClothing',[]);

  app.controller('ProductsController',['$http',function($http){
    var self = this;

    self.products = [];

    self.showByColor = function(product, color) {
      return product.activeColor === color;
    };

    self.activateColor = function(product,color) {
      product.activeColor = color;
    };

    self.resetFilter = function() {

    };

    self.filterByMen = function(filter) {

    };

    self.filterByWomen = function(filter) {

    };

    self.isProductShown = function(product) {
      return true;
    };

    var setActiveColor = function(productsArray) {
      for (var i=0;i<productsArray.length;i++) {
        var product = productsArray[i];
        product.activeColor = product.colors[0];
      }
    };

    $http.post('/products').success(function(data,status) {
      self.products = data;
      setActiveColor(self.products);
      console.log(self.products);
    })
    .error(function(){
      console.log('error fetching products');
    });

  }]);


}());
