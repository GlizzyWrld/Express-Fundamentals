const { sqlForPartialUpdate } = require('./helpers/sql');
const { BadRequestError } = require("../expressError");


describe('sqlForPartialUpdate', () => {
    test('should return the correct setCols and values for valid input', () => {
      const dataToUpdate = {
        firstName: 'Aliya',
        age: 32,
      };
  
      const jsToSql = {
        firstName: 'first_name',
        age: 'age',
      };
  
      const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
  
      expect(result).toEqual({
        setCols: '"first_name"=$1, "age"=$2',
        values: ['Aliya', 32],
      });
    });
  
    test('should throw BadRequestError when no data is provided', () => {
      const dataToUpdate = {};
      const jsToSql = {};
  
      expect(() => {
        sqlForPartialUpdate(dataToUpdate, jsToSql);
      }).toThrow(BadRequestError);
    });
});