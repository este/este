jest.dontMock('../getrandomstring');
// Always use 'require' in jest tests to avoid Babel hoisting imports before
// 'jest.dontMock'.
const getRandomString = require('../getrandomstring').getRandomString;

describe('getRandomString', () => {
  it('is a string', () => {
    expect(getRandomString()).toEqual(jasmine.any(String));
  });
});
