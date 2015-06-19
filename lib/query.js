/**
* Query Module.
* @module lib/query
*/

var _   = require('underscore');
var helpers = require('./attribute-value-helpers');
var operators = require('./expression-operators');

/**
* A new dynamodb query.
* @constructor
* @param {object} schema - A dynamodb schema.
*/
var Query = function(tableSchema){
  this.query = {};
  this.schema = tableSchema;
  this.attributeValueCnt = 0;
}

Query.prototype.tableName = function(tableName) {
  this.query.TableName = tableName;
  return this;
};

Query.prototype.indexName = function(indexName) {
  this.query.IndexName = indexName;
  return this;
};

Query.prototype.scanIndexForward = function(isForward) {
  this.query.ScanIndexForward = isForward;
  return this;
};

Query.prototype.limit = function(limit) {
  this.query.Limit = limit;
  return this;
};

Query.prototype.create = function() {
  return this.query;
};


Query.prototype.keyConditionExpression = function(expressArray) {

  this.query.KeyConditionExpression = this._expressionForArray(expressArray);

  return this;
};

Query.prototype.filterExpression = function(expressArray, opts) {
  this.query.FilterExpression = this._expressionForArray(expressArray, opts);
  return this;
};

Query.prototype.expressionAttributeValue = function(varName, value) {
   if(!this.query.ExpressionAttributeValues ){
    this.query.ExpressionAttributeValues = {};
  }
  this.query.ExpressionAttributeValues[varName] =
    helpers.valueObject(value);
  return this;
};

Query.prototype._expressionForArray = function(expressArray, opts) {
  opts = opts || {};
  var ignoreNulls = opts.ignoreNulls;

  if (_.isString(expressArray)){
    return expressArray;
  };

  if(!this.query.ExpressionAttributeValues ){
    this.query.ExpressionAttributeValues = {};
  }

  if (! _.isArray(expressArray)) {
    expressArray = [expressArray];
  };

  var expressions = []
  var _this = this;

  _.each(expressArray, function(expressObj){
    if ( ! ignoreNulls || expressObj.value != null) {
      var expression = _this._expression(expressObj);
      expressions.push(expression);
    };
    return null;
  });
  return expressions.join(' and ');
};

/**
* Creates a condition expression
* @param {Object} expressObj - contains the condition expression
* @param {string} expressObj.key - the table field.
* @param {function} expressObj.operator - The expression operator.
* @param {string} expressObj.value - The expression value.
*/
Query.prototype._expression = function(expressObj) {
  var operator = operators[expressObj.operator];

  if (! operator) {
    throw new Error('Invalid operator: ' + expressObj.operator);
  };

  if (operator.needsVar){
    var attributeValueVar = this._getAttributeValueVar();
    this.query.ExpressionAttributeValues[attributeValueVar] =
      helpers.valueObject(expressObj.value);
  }

  var expression = operator.create(expressObj.key, attributeValueVar);

  return expression;
};

Query.prototype._getAttributeValueVar = function() {
  this.attributeValueCnt ++;
  return ':p' + this.attributeValueCnt;
};

module.exports = Query;
