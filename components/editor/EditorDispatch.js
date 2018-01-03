// @flow
import * as React from 'react';
import * as Editor from './Editor';
import PropTypes from 'prop-types';

type Props = {
  children: (dispatch: Editor.EditorDispatch) => React.Node,
};

type Context = {
  dispatch: Editor.EditorDispatch,
};

const EditorDispatch = (props: Props, context: Context) =>
  props.children(context.dispatch);

EditorDispatch.contextTypes = { dispatch: PropTypes.func };

export default EditorDispatch;
