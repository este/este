// @flow
import createReactContext, { type Context } from 'create-react-context';

type Value = {|
  locale: string,
  supportedLocales: Array<string>,
|};

const value = {
  locale: DEFAULT_LOCALE,
  supportedLocales: [DEFAULT_LOCALE],
};

const LocaleContext: Context<Value> = createReactContext(value);

export default LocaleContext;
