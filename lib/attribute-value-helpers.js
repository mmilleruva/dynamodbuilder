var helpers = {};

helpers.valueObject = function(type, val){
  var obj = {};
  obj[type] = val;

  if (type === "N") {
    obj[type] = val.toString();
  };
  return obj;
}

helpers.valueObjectForSchema = function(schema, field, value){
  if (!schema) {
    throw new Error('No schema');
  };

  var schemaKey = schema[field];
  if (!schemaKey) {
    throw new Error('No field found named: '+ field);
  };
  return this.valueObject(schemaKey, value);
}

module.exports = helpers;
