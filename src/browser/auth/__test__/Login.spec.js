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

  let sandbox, loginComponent, inputs, button, loginAction, replaceState, form;

  function componentProps() {
    return {
      actions: {
        login: loginAction
      },
      history: {
        replaceState
      },
      location: {},
      msg: msg,
      auth: {form: new Form()}
    };
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    loginAction = sandbox.stub().resolves({});
    replaceState = sandbox.spy();

    loginComponent = TestUtils.renderIntoDocument(<Login {...componentProps()} />);
    inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginComponent, 'input');
    button = TestUtils.findRenderedDOMComponentWithTag(loginComponent, 'button');
    form = TestUtils.findRenderedDOMComponentWithTag(loginComponent, 'form');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should generate a login form', () => {
    expect(inputs.length).to.equal(2);
    expect(button).to.not.equal(null);
  });

  it('should fire login action on form submit', () => {
    TestUtils.Simulate.submit(form);

    expect(loginAction.calledOnce).to.be.true;
  });

  it('should redirect to home on successful login', async () => {
    TestUtils.Simulate.submit(form);

    await loginAction();

    expect(replaceState.calledOnce).to.be.true;
    expect(replaceState.calledWithExactly(null, '/')).to.be.true;
  });
});
