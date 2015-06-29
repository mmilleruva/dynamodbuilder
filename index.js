var Query = require('./lib/query.js');
var BinaySet = require('binary-set');
var Binay = require('binary');
var NumberSet = require('number-set');
var StringSet = require('string-set');

var Builder = function(){
}

Builder.prototype.query = function(tableName) {
  var query =  new Query();
  query.tableName(tableName);
  return query;
};

Builder.prototype.binarySet = function(val) {
  return new BinarySet(val);
};

Builder.prototype.binary = function(val) {
  return new Binary(val);
};

Builder.prototype.numberSet = function(val) {
  return new NumberSet(val);
};

Builder.prototype.stringSet = function(val) {
  return new StringSet(val);
};

module.exports = Builder;
