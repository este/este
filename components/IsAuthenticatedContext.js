// @flow
import createReactContext, { type Context } from 'create-react-context';

type Value = {|
  isAuthenticated: boolean,
  userId: ?string,
|};

const value = {
  isAuthenticated: false,
  userId: null,
};

const IsAuthenticatedContext: Context<Value> = createReactContext(value);

export default IsAuthenticatedContext;
