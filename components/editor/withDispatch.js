// @flow
import * as React from 'react';
import type { EditorDispatch } from './Editor';
import PropTypes from 'prop-types';

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
