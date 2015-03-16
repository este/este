jest.dontMock('../getrandomstring')
import {getRandomString} from '../getrandomstring'

describe('getRandomString', () => {
  it('is a string', () =>
    expect(getRandomString()).toEqual(jasmine.any(String)))
})
