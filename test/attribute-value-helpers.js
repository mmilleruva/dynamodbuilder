var chai = require('chai');
var expect = chai.expect;
var helper = require('../lib/attribute-value-helpers');

describe('createValueObject', function(){
  it('should return a string object', function(){

    var result = helper.valueObject("hello");
    expect(result).to.eql({'S': "hello"});

  });

  it('should call to string on numeric objects', function(){
    var result = helper.valueObject( 2);
    expect(result).to.eql({'N': "2"});
  });
});
