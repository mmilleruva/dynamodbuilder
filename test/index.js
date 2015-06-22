var chai = require('chai');
var expect = chai.expect;
var Builder = require('../index');

describe('Builder', function(){
  beforeEach(function(){
    this.builder = new Builder();
    this.schema = {
        "firstName": "S",
        "lastName": "S",
        "books": "SS",
        "age": "N",
        "optedIn": "BOOL"
      };
  });
  describe('addTable', function(){
    it('should add a new table', function(){
      this.builder.addTable('myTable', this.schema);
      expect(this.builder.tables['myTable']).to.eql(this.schema);
    });
  });
});
