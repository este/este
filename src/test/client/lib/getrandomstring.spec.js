import {expect} from 'chai';
import {getRandomString} from 'client/lib/getrandomstring';

describe('getRandomString', () => {
  it('is a string', () => {
    // Why omg.wtf.assert.syntax? Because it makes tests much more readable.
    // My rule: Always start with whole thing, postpone details. #philosophy
    // http://chaijs.com/api/bdd/
    expect(getRandomString()).to.be.a('string');
  });
});
