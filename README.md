# dynamodbuilder
A builder library for dynamodb

## Usage

```javascript

var builder = require('dynamodbuilder');
var dynamodb = require('aws').DynamoDB({
  accessKeyId: '<id>',
  secretAccessKey: '<secret>',
  region: '<region>'
});

var schema = {
  "firstName": "S",
  "lastName": "S",
  "books": "SS",
  "age": "N",
  "optedIn": "BOOL"
};

builder.addTable('myTable', schema);

var query = builder.query('myTable');

// Using strings
var queryObj = query
  .keyConditionExpression('firstName = :name')
  .expressionAttributeValue('firstName', ':name', 'mike')
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
* `tableName` - The tableName.
