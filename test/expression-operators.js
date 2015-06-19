var chai = require('chai');
var expect = chai.expect;
operators = require('../lib/expression-operators');
var operators = require('../lib/expression-operators');

describe('Expression Operators', function(){
  describe('=', function(){
    it('should set equals correct', function(){
      var result = operators['='].create('name', ':p1');
      expect(result).to.eql('name = :p1');
    });
  });

  describe('attribute_not_exists', function(){
    it('should set attribute_not_exists correct', function(){
      var result = operators['attribute_not_exists'].create('name');
      expect(result).to.eql('attribute_not_exists (name)');
    });
  });

  describe('attribute_type', function(){
    it('should set attribute_not_exists correct', function(){
      var result = operators['attribute_type'].create('name', ':SS');
      expect(result).to.eql('attribute_type (name, :SS)');
    });
  });
});
