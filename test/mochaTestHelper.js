import chai, {assert, expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

export {
  assert,
  chai,
  expect,
  React,
  sinon,
  sinonChai,
  TestUtils
};
