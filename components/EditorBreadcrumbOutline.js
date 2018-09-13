// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'slate-react';
import withTheme, { type Theme } from './core/withTheme';

type EditorBreadcrumbOutlineProps = {|
  node: Object,
  theme: Theme,
|};

type EditorBreadcrumbOutlineState = {|
  el: ?HTMLDivElement,
  rect: ?ClientRect,
|};

class EditorBreadcrumbOutline extends React.PureComponent<
  EditorBreadcrumbOutlineProps,
  EditorBreadcrumbOutlineState,
> {
  state = {
    el: null,
    rect: null,
  };

  componentDidMount() {
    // Can't be in constructor because of SSR where window does not exists.
    const el = window.document.getElementById('__next');
    const rect = this.getRect();
    this.setState({ el, rect });
  }

  componentDidUpdate(prevProps) {
    // Because of state.rect, always compare values.
    if (this.props.node !== prevProps.node) {
      const rect = this.getRect();
      this.setState({ rect });
    }
  }

  getRect() {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(this.props.node.key).getBoundingClientRect();
  }

  render() {
    const { el, rect } = this.state;
    if (el == null || rect == null) return null;
    const { theme } = this.props;
    return ReactDOM.createPortal(
      <>
        <View
          style={[
            theme.styles.editorBreadcrumbOutline,
            {
              width: 1,
              height: rect.height,
              left: rect.left + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            theme.styles.editorBreadcrumbOutline,
            {
              width: 1,
              height: rect.height,
              left: rect.right - 1 + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            theme.styles.editorBreadcrumbOutline,
            {
              width: rect.width,
              height: 1,
              left: rect.left + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            theme.styles.editorBreadcrumbOutline,
            {
              width: rect.width,
              height: 1,
              left: rect.left + window.pageXOffset,
              top: rect.bottom - 1 + window.pageYOffset,
            },
          ]}
        />
      </>,
      el,
    );
  }
}

export default withTheme(EditorBreadcrumbOutline);
