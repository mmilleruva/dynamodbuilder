# dynamodbuilder
[![Build Status](https://travis-ci.org/mmilleruva/dynamodbuilder.svg?branch=master)](https://travis-ci.org/mmilleruva/dynamodbuilder)
A builder library for dynamodb

## Usage

```javascript

var Builder = require('dynamodbuilder');
var dynamodb = require('aws').DynamoDB({
  accessKeyId: '<id>',
  secretAccessKey: '<secret>',
  region: '<region>'
});

var builder = new Builder();

var query = builder.query('myTable');

// Using strings
var queryObj = query
  .keyConditionExpression('firstName = :name')
  .expressionAttributeValue(':name', 'mike')
  .limit(100)
  .create();

dynamodb.query(queryObj, function(err, data){})

// Using condition objects
query = builder.query('myTable');

var conditions = [
   { key: 'firstName', operator: '=', value: 'mike'},
   { key: 'lastName',  operator: '=', value: 'miller'}
];
var queryObj = query
  .keyConditionExpression(conditions)
  .indexName('myTable-firstNameIndex')
  .scanIndexForward(false)
  .limit(100)
  .create();

dynamodb.query(queryObj, function(err, data){})

```
## Query Object

### query.tableName(tableName)
Sets the tableName of the query. This is set automatically when
`builder.query("myTable")` is called.

#### Arguments
* `tableName` - The table name.

### query.indexName(indexName)
Sets the index of the query.

#### Arguments
* `indexName` - The index to use.

### query.scanIndexForward(bool)
Should results be returned in ascending or descending order.

#### Arguments
* `bool` - should results be returned in ascending order.

### query.limit(limit)
Max number of records to return.

#### Arguments
* `limit` - The max number of records to return.

### query.keyConditionExpression(...)
Sets the KeyConditionExpression field. There are several different ways to call
this function. See details below

#### query.keyConditionExpression(conditionString)
* `conditionSting` - A valid condition expression (i.e.) `"name = :theName"`

**Note**: when called this way you must call `query.expressionAttributeValue(...)`
to manually set the expressionAttribute.

#### query.keyConditionExpression(conditionExpressionObj)
* `conditionExpressionObj` - A condition expression object.
  * Example: `{key: 'name', operator: "=", value: 'mike' }`
  * **Note:** When called this way an expression attribute value is automatically
    added to the query.

#### query.keyConditionExpression(conditionExpressionArray)
Same as above except an array of conditionExpressionObjs can be passed in.
All of the conditions will be `and`ed together.

### query.filterExpression(...)
Follows the same pattern as `query.keyConditionExpression(...)` except the
FilterExpression is updated instead of the KeyConditionExpression.

### query.expressionAttributeValue(varName, value)

#### Arguments
* varName - the name of the variable used in your expression (i.e. `:theName`)
* value - The value being passed.

### query.create()
Returns a json object that can be passed as a dynamodb query.

