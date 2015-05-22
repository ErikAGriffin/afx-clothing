(function() {

  var app = angular.module('afxClothing',['ngAnimate']);

  app.controller('ProductsController',['$http','$cart',function($http,$cart){
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

    self.isCartShowing = false;

    self.showCart = function() {
      self.isCartShowing = true;
    };

    self.hideCart = function() {
      self.isCartShowing = false;
    };

    self.canAdd = function(product) {
      var color = product.activeColor;
      if (product.isInCart[color]) {return false;}
      return (product.stock[color] > 0);
    };

    self.addToCart = function(product) {
      var color = product.activeColor;
      product.isInCart[color] = true;
      var cartObject = {
        productID: product.productID,
        name: product.name,
        color: color,
        price: product.price-product.discount[color],
        stock: product.stock[color],
        quantity: 1
      };
      self.cart.push(cartObject);
      // Send to server.
      $cart.addToCart(cartObject);
      console.log(self.cart);
    };

    self.removeFromCart = function(product) {
      // Array.find() not widely supported.
      for (var index=0;index<self.cart.length;index++) {
        var cartProduct = self.cart[index];
        var idSame = cartProduct.productID === product.productID;
        var colorSame = cartProduct.color === product.activeColor;
        if (idSame && colorSame) {
          $cart.removeFromCart(self.cart.splice(index,1).pop());
          product.isInCart[product.activeColor] = false;
          break;
        }
      }
    };

    // --- Fetching All Products ---

    var setActiveColor = function(productsArray) {
      for (var i=0;i<productsArray.length;i++) {
        var product = productsArray[i];
        product.activeColor = product.colors[0];
        product.isInCart = {};
        product.isInCart[product.activeColor] = false;
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
