const testHelper = require('../../helpers/test-helper');

describe('Search index page', function(){
  testHelper.setupBefore();

  it('should render content for search index page', function(done){
    testHelper.shunterTest('index', 'layout', 'search', done, true);
  });

});
