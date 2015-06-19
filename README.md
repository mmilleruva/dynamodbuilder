# dynamodbuilder
A builder library for dynamodb

## Usage

```javascript
var builder = require('dynamodbuilder');

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
var result = query
  .keyConditionExpression('firstName = :name')
  .expressionAttributeValue(':name', 'mike')
  .limit(100)
  .create();

// Using condition objects
var conditions = [
   { key: 'firstName', operator: '=', value: 'mike'},
   { key: 'lastName',  operator: '=', value: 'miller'}
];
var result = query
  .keyConditionExpression(conditions)
  .limit(100)
  .scanIndexForward(false)
  .create();

```
