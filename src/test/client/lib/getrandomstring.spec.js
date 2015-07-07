import getRandomString from 'client/lib/getrandomstring';
import {expect} from 'chai';

describe('getRandomString', () => {
  it('is a string', () => {
    expect(getRandomString()).to.be.a('string');
  });
});
