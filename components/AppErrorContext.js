// @flow
import createReactContext, { type Context } from 'create-react-context';
import { type AppError } from '../lib/appError';

type Value = {|
  appError: ?AppError,
  dispatchAppError: (appError: AppError) => void,
|};

const value = {
  appError: null,
  dispatchAppError: () => {},
};

const AppErrorContext: Context<Value> = createReactContext(value);

export default AppErrorContext;
