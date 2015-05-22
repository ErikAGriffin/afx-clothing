(function() {

  var findProduct = function(userCart, newItem) {
    var result = userCart.filter(function(cartObject) {
      var idSame = cartObject.productID === newItem.productID;
      var colorSame = cartObject.color === newItem.color;
      return (idSame && colorSame);
    });
    return result[0];
  };

  var addIfUnique = function(userCart, newItem) {
    var result = findProduct(userCart, newItem);
    if (!result) {userCart.push(newItem);}
  };

  var removeFromCart = function(userCart, newItem) {
    // Array.find() not widely supported.
    for (var i=0;i<userCart.length;i++) {
      var cartObject = userCart[i];
      var idSame = cartObject.productID === newItem.productID;
      var colorSame = cartObject.color === newItem.color;
      if (idSame && colorSame) {
        userCart.splice(i,1);
        break;
      }
    }
  };

  var updateQuantity = function(userCart, newItem) {
    var result = findProduct(userCart, newItem);
    result.quantity = newItem.quantity;
  };


  module.exports.updateQuantity = updateQuantity;
  module.exports.addIfUnique = addIfUnique;
  module.exports.removeFromCart = removeFromCart;

}());
