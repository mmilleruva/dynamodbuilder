var Binary = function(val){
  this.val = val;
};

Binary.prototype.getAttributeValue = function() {
  return {B: this.val};
};

module.exports = Binary;

