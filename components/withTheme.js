// @flow
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

// withTheme should be higher order component but not sure how to flow type it.
// const withTheme = (WrappedComponent: any) => {
//   const WithTheme = (props: any, { theme }: { theme: Theme }) => (
//     <WrappedComponent {...props} theme={theme} />
//   );
//   WithTheme.contextTypes = {
//     theme: PropTypes.object,
//   };
//   return WithTheme;
// };
// TODO: Make higher order component.

const withTheme = (Component: ReactClass<mixed>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
