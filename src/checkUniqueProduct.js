(function() {

  var checkUniqueProduct = function(userCart, newItem) {
    var result = userCart.filter(function(product) {
      var idSame = product.productID === newItem.productID;
      var colorSame = product.color === newItem.color;
      return (idSame && colorSame);
    });
    return !result[0];
  };

  module.exports = checkUniqueProduct;

}());
