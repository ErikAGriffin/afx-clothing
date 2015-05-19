(function() {

  var app = angular.module('afxClothing',[]);

  app.controller('ProductsController',['$http',function($http){
    var self = this;

    self.products = [];

    $http.post('/products').success(function(data,status) {
      self.products = data;
      console.log(self.products[0]);
    })
    .error(function(){
      console.log('error fetching products');
    });

  }]);


}());
