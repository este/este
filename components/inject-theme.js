// @flow
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeProp = {
  theme: Theme,
};

const injectTheme = <T>(WrappedComponent: ReactClass<T>): ReactClass<T> => {
  const InjectTheme = (props: Object, { theme }: { theme: Theme }) =>
    <WrappedComponent {...props} theme={theme} />;
  InjectTheme.contextTypes = {
    theme: PropTypes.object,
  };
  return InjectTheme;
};

export default injectTheme;
