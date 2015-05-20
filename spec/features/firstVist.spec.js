describe('First Visit to AFX', function() {

  // var shoppingCart = element(by.model('cart'));

  var titles = element.all(by.binding('product.name'));
  var mens = element(by.cssContainingText('a', 'Men'));
  var womens = element(by.cssContainingText('a','Women'));
  var mensFormal = $('a[ng-click="productsCtrl.filterByMen(\'Formalwear\')"]');
  var womensFootwear = $('a[ng-click="productsCtrl.filterByWomen(\'Footwear\')"]');

  var hoverOver = function(element) {
    browser.actions().
    mouseMove(element).
    perform();
  };

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('Website Title is AFX Clothing', function() {
    expect(browser.getTitle()).toEqual('AFX Clothing');
  });

  xit('Begins with an empty shopping cart', function() {

  });

  // Consequentially, this test also depends on the order
  // of the products.json. Hm.

  it('Begins with available products listed', function() {
    expect(titles.get(0).getText()).toEqual('Almond Toe Court Shoes');
    expect(titles.get(10).getText()).toEqual('Mid Twist Cut-Out Dress');
  });

  // This test is dependent on the order of products not changing.
  // I'm not sure how to check a random or arbitrary male and
  // female items, without adding unnecessary html to the page

  it('Will filter products by gender', function() {
    expect(titles.get(0).isDisplayed()).toBeTruthy();
    expect(titles.get(2).isDisplayed()).toBeTruthy();
    mens.click();
    expect(titles.get(0).isDisplayed()).toBeFalsy();
    expect(titles.get(2).isDisplayed()).toBeTruthy();
    womens.click();
    expect(titles.get(0).isDisplayed()).toBeTruthy();
    expect(titles.get(2).isDisplayed()).toBeFalsy();
  });

  // As a matter of fact, all of my tests are dependent
  // on the ordering of products in products.json,
  // or in a real application the order which they are
  // retrieved from the database.

  it('Will filter products by gender+category', function() {
    hoverOver(mens);
    mensFormal.click();
    expect(titles.get(9).isDisplayed()).toBeFalsy();
    expect(titles.get(7).isDisplayed()).toBeTruthy();
    hoverOver(womens);
    womensFootwear.click();
    expect(titles.get(0).isDisplayed()).toBeTruthy();
    expect(titles.get(2).isDisplayed()).toBeFalsy();
  });


});
