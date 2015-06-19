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

var result = query
  .keyConditionExpression('firstName = :name')
  .addExpressionAttributeValue(':name', 'mike')
  .limit(100)
  .create();

```
