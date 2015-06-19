var _   = require('underscore');
var helpers = require('./attribute-value-helpers');

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

Query.prototype._expressionForArray = function(expressArray, opts) {
  opts = opts || {};
  var ignoreNulls = opts.ignoreNulls;

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
* @param [Object] expressObj - contains the condition expression
* @param {string} expressObj.key - the table field.
* @param {function} expressObj.operator - The expression operator.
* @param {string} expressObj.value - The expression value.
*/
Query.prototype._expression = function(expressObj) {

  if (expressObj.operator.needsVar){
    var attributeValueVar = this._getAttributeValueVar();
    this.query.ExpressionAttributeValues[attributeValueVar] =
      helpers.valueObjectForSchema(this.schema, expressObj.key, expressObj.value);
  }

  var expression = expressObj.operator.create(expressObj.key, attributeValueVar);

  return expression;
};

Query.prototype._getAttributeValueVar = function() {
  this.attributeValueCnt ++;
  return ':p' + this.attributeValueCnt;
};

module.exports = Query;
