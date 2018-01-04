// @flow
import * as React from 'react';
import * as Editor from './Editor';
import PropTypes from 'prop-types';

type Props = {
  children: (dispatch: Editor.EditorDispatch) => React.Node,
};

class EditorDispatch extends React.PureComponent<Props> {
  static contextTypes = { dispatch: PropTypes.func };

  context: {
    dispatch: Editor.EditorDispatch,
  };

  render() {
    return this.props.children(this.context.dispatch);
  }
}

export default EditorDispatch;
