jest.dontMock('../lib/getrandomstring')
import {getRandomString} from '../lib/getrandomstring'

describe('getRandomString', () => {
  it('is a string', () =>
    expect(getRandomString()).toEqual(jasmine.any(String)))
})
