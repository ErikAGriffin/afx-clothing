describe('First Visit to AFX', function() {

  // var shoppingCart = element(by.model('cart'));

  var titles = element.all(by.binding('product.name'));
  var mens = element(by.cssContainingText('a', 'Men'));

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('Website Title is AFX Clothing', function() {
    expect(browser.getTitle()).toEqual('AFX Clothing');
  });

  xit('Begins with an empty shopping cart', function() {

  });

  it('Begins with available products listed', function() {
    expect(titles.get(0).getText()).toEqual('Almond Toe Court Shoes');
    expect(titles.get(10).getText()).toEqual('Mid Twist Cut-Out Dress');
  });

  // This test is dependent on the order of products not changing.
  // I'm not sure how to check a random or arbitrary male and
  // female items, without adding additional hmtl

  it('Will filter products by gender', function() {
    expect(titles.get(0).isDisplayed()).toBeTruthy();
    expect(titles.get(2).isDisplayed()).toBeTruthy();
    mens.click();
    expect(titles.get(0).isDisplayed()).toBeFalsy();
    expect(titles.get(2).isDisplayed()).toBeTruthy();
  });


});
