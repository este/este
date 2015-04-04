jest.dontMock('../getrandomstring');
const getRandomString = require('../getrandomstring').getRandomString;

describe('getRandomString', () => {
  it('is a string', () => {
    expect(getRandomString()).toEqual(jasmine.any(String));
  });
});
