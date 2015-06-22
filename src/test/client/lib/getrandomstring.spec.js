import {expect} from 'chai';
import {getRandomString} from 'client/lib/getrandomstring';

describe('getRandomString', () => {
  it('is a string', () => {
    expect(getRandomString()).to.be.a('string');
  });
});
