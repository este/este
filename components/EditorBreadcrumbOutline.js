// @flow
/* eslint-env browser */
import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ReactDOM from 'react-dom';

type EditorBreadcrumbOutlineProps = {|
  node: Object,
  onPress: () => void,
|};

type EditorBreadcrumbOutlineState = {|
  el: ?HTMLDivElement,
|};

class EditorBreadcrumbOutline extends React.PureComponent<
  EditorBreadcrumbOutlineProps,
  EditorBreadcrumbOutlineState,
> {
  state = {
    el: null,
  };

  componentDidMount() {
    // Can't be in constructor because of SSR where window does not exists.
    const el = window.document.getElementById('__next');
    this.setState({ el });
  }

  render() {
    const { el } = this.state;
    if (el == null) return null;
    // findDOMNode and getBoundingClientRect in render are ok because
    // component is pure aka rerendered only when prop node is changed.
    // Can't use findDOMNode because it throws when node does not exists.
    // import { findDOMNode } from 'slate-react';
    const { node } = this.props;
    const nodeElement: Element = window.document.querySelector(
      `[data-key="${node.key}"]`,
    );
    if (nodeElement == null) return null;
    const rect = nodeElement.getBoundingClientRect();
    return ReactDOM.createPortal(
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={{
            width: rect.width,
            height: rect.height,
            backgroundColor: 'red',
            opacity: 0.2,
            position: 'absolute',
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
          }}
        />
      </TouchableWithoutFeedback>,
      el,
    );
  }
}

export default EditorBreadcrumbOutline;
