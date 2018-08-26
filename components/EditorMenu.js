// @flow
/* eslint-env browser */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { findDOMNode } from 'slate-react';
import EditorMenuButtons from './EditorMenuButtons';
import EditorMenuLink from './EditorMenuLink';
import EditorMenuLinkPreview from './EditorMenuLinkPreview';

export type EditorMenuAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |}
  | {| type: 'BLOCKQUOTE' |}
  // It's must to use passed change, if any. Slate requires it in onKeyDown.
  | {| type: 'LINK', href: ?string, change?: Object |}
  | {| type: 'FOCUS' |};

export type EditorMenuView = null | 'buttons' | 'link' | 'linkPreview';

type EditorMenuProps = {|
  value: Object,
  onAction: (action: EditorMenuAction) => void,
  theme: Theme,
|};

type EditorMenuState = {|
  left: number,
  top: number,
  view: EditorMenuView,
  hasLinks: boolean,
  linkNode: ?Object,
|};

class EditorMenu extends React.PureComponent<EditorMenuProps, EditorMenuState> {
  state = {
    left: 0,
    top: 0,
    view: null,
    hasLinks: false,
    linkNode: null,
  };

  componentDidMount() {
    this.el = window.document.createElement('div');
    this.modalRoot = window.document.getElementById('__next');
    if (this.modalRoot && this.el) this.modalRoot.appendChild(this.el);
    this.maybeUpdateLeftTopState();
  }

  componentDidUpdate(prevProps) {
    // https://reactjs.org/docs/react-component.html#componentdidmount
    // setState in componentDidUpdate is valid for tooltips, but we have to wrap
    // it in a condition.
    // Without PureComponent, it would cause a loop. With PureComponent, it
    // would cause double measuring of selection rect.
    // We can't use ref with setNativeProps, because:
    // 1) if this.el is set in componentDidMount, we can't set position because
    //    ref is not available yet.
    // 2) if this.el is set in constructor, server and client HTML would be
    //    different.
    // Therefore, this is the only right approach.
    if (this.props.value !== prevProps.value) {
      this.maybeUpdateLeftTopState();
    }
  }

  componentWillUnmount() {
    if (this.modalRoot && this.el) this.modalRoot.removeChild(this.el);
  }

  static getDerivedStateFromProps(
    props: EditorMenuProps,
    state: EditorMenuState,
  ): $Shape<EditorMenuState> {
    const ignoreViewWithFocus = state.view === 'link';
    if (ignoreViewWithFocus) return null;
    const { value } = props;
    const { fragment, selection } = value;
    const hasLinks = value.inlines.some(inline => inline.type === 'link');
    const linkNode = value.inlines.find(inline => inline.type === 'link');
    const newState = { hasLinks, linkNode };
    if (selection.isFocused) {
      if (selection.isCollapsed) {
        const view = hasLinks ? 'linkPreview' : null;
        return { ...newState, view };
      }
      if (fragment.text !== '') {
        return { ...newState, view: 'buttons' };
      }
    }
    return { ...newState, view: null };
  }

  handleActionsSelectView = view => {
    this.setState({ view });
  };

  handleEditorMenuLinkClose = focusEditor => {
    this.setState({ view: 'buttons' }, () => {
      if (focusEditor === true) this.props.onAction({ type: 'FOCUS' });
    });
  };

  handleEditorMenuLinkSubmit = href => {
    this.props.onAction({ type: 'LINK', href });
  };

  handleKeyModK(change: Object) {
    const { value } = this.props;
    const { fragment, selection } = value;
    if (selection.isCollapsed) {
      const { linkNode } = this.state;
      if (!linkNode) return;
      const href = linkNode.data.get('href');
      // TODO: Use router push for web links.
      window.open(href);
      return;
    }
    if (fragment.text === '') return;
    if (this.state.hasLinks) {
      this.props.onAction({ type: 'LINK', href: null, change });
    } else {
      this.setState({ view: 'link' });
    }
  }

  modalRoot: ?HTMLDivElement;
  el: ?HTMLDivElement;

  maybeUpdateLeftTopState() {
    switch (this.state.view) {
      case 'buttons': {
        const rect = window
          .getSelection()
          .getRangeAt(0)
          .getBoundingClientRect();
        this.setState({
          left: rect.left,
          top: window.pageYOffset + rect.bottom,
        });
        break;
      }
      case 'link': {
        break;
      }
      case 'linkPreview': {
        const { linkNode } = this.state;
        if (!linkNode) return;
        // eslint-disable-next-line react/no-find-dom-node
        const rect = findDOMNode(linkNode).getBoundingClientRect();
        this.setState({
          left: rect.left,
          top: window.pageYOffset + rect.bottom,
        });
        break;
      }
      case null:
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (this.state.view: empty);
    }
  }

  renderView() {
    const { value, onAction } = this.props;
    switch (this.state.view) {
      case 'buttons':
        return (
          <EditorMenuButtons
            value={value}
            onAction={onAction}
            onSelectView={this.handleActionsSelectView}
            hasLinks={this.state.hasLinks}
          />
        );
      case 'link':
        return (
          <EditorMenuLink
            onClose={this.handleEditorMenuLinkClose}
            onSubmit={this.handleEditorMenuLinkSubmit}
          />
        );
      case 'linkPreview': {
        const { linkNode } = this.state;
        if (!linkNode) return;
        const href = linkNode.data.get('href');
        return <EditorMenuLinkPreview href={href} />;
      }
      case null:
        return null;
      default:
        // eslint-disable-next-line no-unused-expressions
        (this.state.view: empty);
    }
  }

  render() {
    const { el } = this;
    if (el == null) return null;
    const view = this.renderView();
    if (view == null) return null;
    const { left, top } = this.state;
    return ReactDOM.createPortal(
      <View style={[this.props.theme.styles.editorMenu, { left, top }]}>
        {view}
      </View>,
      el,
    );
  }
}

// This is workaround for https://github.com/este/este/issues/1571
export type EditorMenuType = typeof EditorMenu;

export default withTheme(EditorMenu);
