// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';

// TODO: Use Relay types once released.
export type RelayContext = { relay: { environment: Object } };

const withRelay = (Component: ComponentType<any>) => {
  // $FlowFixMe
  Component.contextTypes = {
    // $FlowFixMe
    ...Component.contextTypes,
    relay: PropTypes.object,
  };
};

export default withRelay;
