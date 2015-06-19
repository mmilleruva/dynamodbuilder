var chai = require('chai');
var expect = chai.expect;
var helper = require('../lib/attribute-value-helpers');

describe('createValueObject', function(){
  it('should return a string object', function(){

    var result = helper.valueObject('S', "hello");
    expect(result).to.eql({'S': "hello"});

  });

  it('should call to string on numeric objects', function(){
    var result = helper.valueObject('N', 2);
    expect(result).to.eql({'N': "2"});
  });
});

describe('valueObjectForSchema', function(){
  beforeEach(function(){
    this.schema = {
      "firstName": "S",
      "lastName": "S",
      "books": "SS",
      "age": "N",
      "optedIn": "BOOL"
    };
  });

  it('should return a string object', function(){
    var result = helper.valueObjectForSchema(this.schema, 'firstName', "hello");
    expect(result).to.eql({'S': "hello"});
  });

  it('should call to string on numeric objects', function(){
    var result = helper.valueObjectForSchema(this.schema, 'age', 2);
    expect(result).to.eql({'N': "2"});
  });
});



// describe('addTable', function(){
//   beforeEach(function(){
//     this.helper = new Helper();
//   });
//   it('should let you add a table', function(){
//     this.helper.addTable('test', {"hello": "S"});
//     expect(this.helper.tables.test).to.eql({"hello": "S"});
//   });
// });

// describe('createValueObjectsForSchema', function(){

//   it('should throw an exception if no table found', function(){
//     try {
//       var result = this.helper.createValueObjectFromSchema('na', {});
//       expect(1).to.eql(0);
//     } catch (e){
//       expect(e.message).to.eql('Table na not found');
//     };
//   });

//   it('should map an object to value objects', function(){
//     var result = this.helper.createValueObjectFromSchema('test', {
//       firstName: "Mike",
//       lastName: "Miller",
//       books: ["first", "second"],
//       age: 2
//     });
//     expect(result).to.eql({
//       firstName: { S: "Mike" },
//       lastName: { S: "Miller" },
//       books: { SS: ["first", "second"] },
//       age: { N: "2" }
//     });
//   });

// });


