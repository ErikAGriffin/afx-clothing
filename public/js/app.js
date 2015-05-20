(function() {

  var app = angular.module('afxClothing',[]);

  app.controller('ProductsController',['$http',function($http){
    var self = this;

    self.products = [];

    self.cart = [];

    // --- Choosing Product Color ---

    self.showByColor = function(product, color) {
      return product.activeColor === color;
    };

    self.activateColor = function(product,color) {
      product.activeColor = color;
    };

    // --- Filtering Products ---

    self.showMenOptions = false;
    self.showWomenOptions = false;

    self.hoverMen = function() {
      self.showWomenOptions = false;
      self.showMenOptions = true;
    };

    self.hoverWomen = function() {
      self.showMenOptions = false;
      self.showWomenOptions = true;
    };

    self.hoverClear = function() {
      self.showMenOptions = false;
      self.showWomenOptions = false;
    };

    self.productFilter = {
      gender: false,
      category: false
    };

    self.resetFilter = function() {
      self.productFilter.gender = false;
      self.productFilter.category = false;
    };

    self.filterByMen = function(filter) {
      self.productFilter.gender = 'Mens';
      if (!filter) {self.productFilter.category = false;}
      else {self.productFilter.category = filter;}
    };

    self.filterByWomen = function(filter) {
      self.productFilter.gender = 'Womens';
      if (!filter) {self.productFilter.category = false;}
      else {self.productFilter.category = filter;}
    };

    self.isProductShown = function(product) {
      if (!self.productFilter.gender) {return true;}
      else if (!self.productFilter.category) {
        return product.gender === self.productFilter.gender;
      }
      else {
        return (product.gender === self.productFilter.gender) &&
          (product.category === self.productFilter.category);
      }
    };

    // --- Shopping Cart ---

    self.addToCart = function(product) {
      var cartObject = {
        productID: product.productID,
        color: product.activeColor,
        quantity: 1
      };
      self.cart.push(cartObject);
      // Send to server.
      // So, so ugly angular.
      $http({
        url:'/addToCart',
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        data: cartObject
      })
      .error(function(data,status) {
        console.log(status+": Error adding item to cart.\n"+data);
      });
    };

    // --- Fetching All Products ---

    var setActiveColor = function(productsArray) {
      for (var i=0;i<productsArray.length;i++) {
        var product = productsArray[i];
        product.activeColor = product.colors[0];
      }
    };

    // make service?
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
