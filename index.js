var Query = require('./lib/query.js');

var Builder = function(){
  tables = {};
}

Builder.prototype.addTable = function(tableName, schema) {
  this.tables[tableName] = schema;
};


Builder.prototype.query = function(tableName) {
  var query =  new Query(this.tables[tableName]);
  query.tableName(tableName);
  return query;
};


module.exports = Builder;
