module.exports = {
  equals: {
    needsVar: true,
    create: function(key, variable) {
      return key + ' = ' + variable;
    }
  },

};
