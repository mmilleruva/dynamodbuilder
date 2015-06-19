var BinarySet = function(val){
  this.val = val;
};

BinarySet.prototype.getAttributeValue = function() {
  return {BS: this.val};
};

module.exports = BinarySet;

