exports.config = {
  framework: 'jasmine2',
  seleniumAddress:'http://localhost:4444/wd/hub',
  specs:['spec/features/*.spec.js'],
  multiCapabilities: [ { browserName: 'chrome'} ]
};
