// This is just a demonstration. I don't think simple components must be tested.

import Form from '../../../common/auth/form';
import Login from '../Login.react';

import {
  expect,
  React,
  sinon,
  TestUtils
} from '../../../../test/mochaTestHelper';

function provideRouterContext(Component, router) {
  return class extends Component {
    static childContextTypes = {
      router: React.PropTypes.object
    };

    getChildContext() {
      return {router};
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

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

  let button;
  let form;
  let inputs;
  let loginAction;
  let loginComponent;
  let replace;
  let sandbox;

  function componentProps() {
    return {
      actions: {
        login: loginAction
      },
      location: {},
      msg: msg,
      auth: {form: new Form()}
    };
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    loginAction = sandbox.stub().returns({
      payload: {
        promise: Promise.resolve({})
      }
    });
    replace = sandbox.spy();

    const Component = provideRouterContext(Login, {replace});
    loginComponent = TestUtils.renderIntoDocument(<Component {...componentProps()} />);
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

    expect(replace.calledOnce).to.be.true;
    expect(replace.calledWithExactly('/')).to.be.true;
  });
});
