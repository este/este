// @flow
import { createTransform } from 'redux-persist';
import { pick } from 'ramda';

// TODO: Add redux-persist-migrate.

const paths = [
  ['app', ['baselineShown', 'currentTheme']],
  ['fields'],
  ['intl', ['currentLocale']],
  ['users', ['viewer']],
];

const transforms = [];
const whitelist = [];

// Paths always override the initialState, because upcoming service workers.
// Paths are explicit, because upcoming migration.
paths.forEach(([feature, props]) => {
  whitelist.push(feature);
  if (!props) return;
  const inOut = state => pick(props, state);
  transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
});

const configureStorage = (appName: string) => ({
  debounce: 100,
  keyPrefix: `${appName}:`,
  transforms,
  whitelist,
});

export default configureStorage;
