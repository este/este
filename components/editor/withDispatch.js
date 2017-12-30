// @flow
import * as React from 'react';
import type { EditorDispatch } from './Editor';
import PropTypes from 'prop-types';

// TODO: Try https://github.com/facebook/flow/issues/5382#issuecomment-354512813

const withDispatch = <Props: {}>(
  Component: React.ComponentType<{ dispatch: EditorDispatch } & Props>,
): React.ComponentType<Props> => {
  const WithDispatch = (props: Props, { dispatch }) => (
    <Component {...props} dispatch={dispatch} />
  );
  WithDispatch.contextTypes = { dispatch: PropTypes.func };
  return WithDispatch;
};

export default withDispatch;
