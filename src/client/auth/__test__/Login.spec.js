import * as actions from '../../../common/auth/actions';
import Form from '../../../common/auth/form';
import Login from '../Login.react';

import {
  expect,
  React,
  sinon,
  TestUtils
} from '../../../../test/mochaTestHelper';

describe('Login component', () => {
  const msg = {
    auth: {
      form: {
        button: {
          login: 'Login'
        },
        placeholder: {
          email: 'your@email.com'
        }
      }
    }
  };

  const data = {
    actions: actions,
    history: {},
    location: {},
    msg: msg,
    auth: {form: new Form()}
  };

  let sandbox, loginForm, inputs, button;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    loginForm = TestUtils.renderIntoDocument(<Login {...data} />);
    inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
    button = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'button');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should generate a login form', () => {
    expect(inputs.length).to.equal(2);
    expect(button).to.not.equal(null);
  });
});
