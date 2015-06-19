var StringSet = function(val){
  this.val = val;
};

StringSet.prototype.getAttributeValue = function() {
  return {SS: this.val};
};

module.exports = StringSet;
