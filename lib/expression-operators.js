module.exports = {
  '=': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' = ' + variable;
    }
  },

};
