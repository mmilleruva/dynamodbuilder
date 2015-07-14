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

  it('should create an array value object for arrays', function(){
    var result = helper.valueObject([1,2,3]);
    expect(result).to.eql({'L': [1,2,3]});
  });

  it('should return an object value object for objects', function(){
    var result = helper.valueObject({"hello": "world"});
    expect(result).to.eql({'M': {"hello": "world"}});
  });

    it('should return an boolean value object for booleans', function(){
    var result = helper.valueObject(false);
    expect(result).to.eql({BOOL: false});
    result = helper.valueObject(true);
    expect(result).to.eql({BOOL: true});
  });
});
