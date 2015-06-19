var _ = require('underscore');

var NumberSet = function(val){
  this.val = val;
};

NumberSet.prototype.getAttributeValue = function() {
  var result = _.map(this.val, function(num){
    return num.toString();
  });
  return {NS: result};
};


module.exports = NumberSet;
