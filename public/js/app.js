(function() {

  var app = angular.module('afxClothing',[]);

  app.controller('ProductsController',['$http',function($http){
    var self = this;

    self.products = [];

    self.activateColor = function(product,color) {
      product.activeColor = color;
    }

    var setActiveColor = function(productsArray) {
      for (var product of productsArray) {
        product.activeColor = product.colors[0];
      }
    };

    $http.post('/products').success(function(data,status) {
      self.products = data;
      setActiveColor(self.products);
      console.log(self.products[3]);
    })
    .error(function(){
      console.log('error fetching products');
    });

  }]);


}());
