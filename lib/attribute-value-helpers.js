var _ = require('underscore');
var helpers = {};

helpers.valueObject = function(val){
  // TODO: SS, NN, BS, B

  if (_.isObject(val) && _.isFunction(val.getAttributeValue)) {
    return val.getAttributeValue();
  }

  if (_.isString(val)) {
    return {S: val};
  }

  if (_.isNumber(val)){
    return {N: val.toString()};
  }

  if (_.isBoolean(val)){
    return {BOOL: val};
  }

  if (_.isArray(val)) {
    return {L: val};
  }

  if(_.isNull(val)){
    return {NULL: true};
  }

  if (_.isObject(val)) {
    return {M : val };
  }

  throw new Error('Data type not mapped for: ' + val );
};

module.exports = helpers;
