import Bluebird from 'bluebird';
import chai, {assert, expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import sinonAsPromised from 'sinon-as-promised';
import sinonChai from 'sinon-chai';
import TestUtils from 'react-addons-test-utils';

chai.should();
chai.use(sinonChai);

// Use Bluebird Promises inside of sinon stubs.
// Bluebird has better error reporting for unhandled Promises.
sinonAsPromised(Bluebird);

export {
  assert,
  chai,
  expect,
  React,
  sinon,
  sinonChai,
  TestUtils
};
