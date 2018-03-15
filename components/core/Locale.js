// @flow
import createReactContext, { type Context } from 'create-react-context';
import { defaultLocale } from '../../server/constants';

type Value = {|
  locale: string,
  supportedLocales: Array<string>,
|};

const value = {
  locale: defaultLocale,
  supportedLocales: [defaultLocale],
};

const LocaleContext: Context<Value> = createReactContext(value);

export const LocaleProvider = LocaleContext.Provider;

export default LocaleContext.Consumer;
