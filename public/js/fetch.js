angular.module('afxClothing').service('$fetch', function($http) {

  var self = this;

  self.getProducts = function() {
    $http.post('/products').success(function(data,status) {
      console.log('ROUND 2!');
      console.log(data);
    });
  };

});
