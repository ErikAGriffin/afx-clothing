(function() {

  var addIfUnique = function(userCart, newItem) {
    var result = userCart.filter(function(product) {
      var idSame = product.productID === newItem.productID;
      var colorSame = product.color === newItem.color;
      return (idSame && colorSame);
    });
    if (!result[0]) {userCart.push(newItem);}
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

  module.exports.addIfUnique = addIfUnique;
  module.exports.removeFromCart = removeFromCart;

}());
