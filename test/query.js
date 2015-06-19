var chai = require('chai');
var expect = chai.expect;
var Query = require('../lib/query');
var operators = require('../lib/expression-operators');

describe('Query', function(){
  beforeEach(function(){
    this.query = new Query();
  });
  describe('limit', function(){
    it('should set the limit', function(){
      var result = this.query.limit(100).create();
      expect(result.Limit).to.eql(100);
    });
  });

  describe('tableName', function(){
    it('should set the table name', function(){
      var result = this.query.tableName('myTable').create();
      expect(result.TableName).to.eql('myTable');
    });
  });

  describe('indexName', function(){
    it('should set the index name', function(){
      var result = this.query.indexName('myIndex').create();
      expect(result.IndexName).to.eql('myIndex');
    });
  });

  describe('scanIndexForward', function(){
    it('should set the scanIndexForward', function(){
      var result = this.query.scanIndexForward(true).create();
      expect(result.ScanIndexForward).to.eql(true);
    });
  });

  describe('keyConditionExpression', function(){
    beforeEach(function(){
      this.schema = {
        "firstName": "S",
        "lastName": "S",
        "books": "SS",
        "age": "N",
        "optedIn": "BOOL"
      };
      this.query = new Query(this.schema);
    });
    it('should be able to set using text', function(){
      var result = this.query
        .keyConditionExpression('firstName = :name')
        .expressionAttributeValue('firstName', ':name', 'mike')
        .create();
      expect(result.KeyConditionExpression).to.eql('firstName = :name');
      expect(result.ExpressionAttributeValues[':name']).to.eql({S: 'mike'})
    });

    it('should be able to set a condition expression', function(){
      var result = this.query.keyConditionExpression({
        key: 'firstName',
        operator: "=",
        value: 'mike'
      }).create();
      expect(result.KeyConditionExpression).to.eql('firstName = :p1');
      expect(result.ExpressionAttributeValues[':p1']).to.eql({S: 'mike'})
    });

    it('should be able to set a multipe condition expressions', function(){
      var expressions = [
        { key: 'firstName', operator: "=", value: 'mike'},
        { key: 'lastName',  operator: "=", value: 'miller'}
      ];
      var result = this.query.keyConditionExpression(expressions).create();
      expect(result.KeyConditionExpression).to.eql(
        'firstName = :p1 and lastName = :p2');
      expect(result.ExpressionAttributeValues[':p1']).to.eql({S: 'mike'})
      expect(result.ExpressionAttributeValues[':p2']).to.eql({S: 'miller'})
    });
  });

  describe('filterExpression', function(){
    beforeEach(function(){
      this.schema = {
        "firstName": "S",
        "lastName": "S",
        "books": "SS",
        "age": "N",
        "optedIn": "BOOL"
      };
      this.query = new Query(this.schema);
    });

    it('should be able to set using text', function(){
      var result = this.query
        .filterExpression('firstName = :name')
        .expressionAttributeValue('firstName', ':name', 'mike')
        .create();
      expect(result.FilterExpression).to.eql('firstName = :name');
      expect(result.ExpressionAttributeValues[':name']).to.eql({S: 'mike'})
    });

    it('should be able to set a condition expression', function(){
      var result = this.query.filterExpression({
        key: 'firstName',
        operator: "=",
        value: 'mike'
      }).create();
      expect(result.FilterExpression).to.eql('firstName = :p1');
      expect(result.ExpressionAttributeValues[':p1']).to.eql({S: 'mike'})
    });

    it('should be able to set a multipe condition expressions', function(){
      var expressions = [
        { key: 'firstName', operator: "=", value: 'mike'},
        { key: 'lastName',  operator: "=", value: 'miller'}
      ];
      var result = this.query.filterExpression(expressions).create();
      expect(result.FilterExpression).to.eql(
        'firstName = :p1 and lastName = :p2');
      expect(result.ExpressionAttributeValues[':p1']).to.eql({S: 'mike'})
      expect(result.ExpressionAttributeValues[':p2']).to.eql({S: 'miller'})
    });

    it('should ignore nulls if option present', function(){
      var expressions = [
        { key: 'firstName', operator: "=", value: 'mike'},
        { key: 'lastName',  operator: "=", value: null},
        { key: 'age',  operator: "=", value: undefined}
      ];
      var opts = {
        ignoreNulls: true
      };
      var result = this.query.filterExpression(expressions, opts).create();
      expect(result.FilterExpression).to.eql('firstName = :p1');
      expect(result.ExpressionAttributeValues[':p1']).to.eql({S: 'mike'});
    });
  });

});

