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

  const loginAction = sinon.stub().resolves({});
  const replaceState = sinon.spy();

  const data = {
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

  let sandbox, loginComponent, inputs, button;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    loginComponent = TestUtils.renderIntoDocument(<Login {...data} />);
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

  it('should fire login action and redirect', (done) => {
    TestUtils.Simulate.submit(form);

    expect(loginAction.calledOnce).to.be.true;
    loginAction().then(() => {
      expect(replaceState.calledOnce).to.be.true;
      expect(replaceState.calledWithExactly(null, '/')).to.be.true;
      done();
    })
  });
});
