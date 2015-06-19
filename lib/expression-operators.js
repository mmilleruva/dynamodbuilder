module.exports = {
  '=': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' = ' + variable;
    }
  },

  '<>': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' <> ' + variable;
    }
  },

  '<': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' < ' + variable;
    }
  },

  '<=': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' <= ' + variable;
    }
  },

  '>': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' > ' + variable;
    }
  },

  '>=': {
    needsVar: true,
    create: function(key, variable) {
      return key + ' >= ' + variable;
    }
  },

  'attribute_exists': {
    needsVar: false,
    create: function(key) {
      return 'attribute_exists ('+ key + ')';
    }
  },

  'attribute_not_exists': {
    needsVar: false,
    create: function(key) {
      return 'attribute_not_exists ('+ key + ')';
    }
  },

  'attribute_type': {
    needsVar: true,
    create: function(key, variable) {
      return 'attribute_type ('+ key + ', ' + variable + ')';
    }
  }

};
