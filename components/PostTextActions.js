// @flow
/* eslint-env browser */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { findDOMNode } from 'slate-react';
import PostTextActionsButtons from './PostTextActionsButtons';
import PostTextActionsLink from './PostTextActionsLink';
import PostTextActionsLinkPreview from './PostTextActionsLinkPreview';

export type PostTextAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |}
  | {| type: 'BLOCKQUOTE' |}
  | {| type: 'LINK', href: ?string |}
  | {| type: 'FOCUS' |};

export type PostTextActionsView = null | 'buttons' | 'link' | 'linkPreview';

type PostTextActionsProps = {|
  value: Object,
  onAction: (action: PostTextAction) => void,
  theme: Theme,
|};

type PostTextActionsState = {|
  left: number,
  top: number,
  view: PostTextActionsView,
  hasLinks: boolean,
  linkNode: ?Object,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  // Probably some Flow race condition bug. Switch not detected. TODO: Check later.
  // state = {
  //   left: 0,
  //   top: 0,
  //   view: null,
  //   hasLinks: false,
  //   linkNode: null,
  // };
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      view: null,
      hasLinks: false,
      linkNode: null,
    };
  }

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
    props: PostTextActionsProps,
    state: PostTextActionsState,
  ): $Shape<PostTextActionsState> {
    const ignoreViewWithFocus = state.view === 'link';
    if (ignoreViewWithFocus) return null;
    const { value } = props;
    const hasLinks = value.inlines.some(inline => inline.type === 'link');
    const linkNode = value.inlines.find(inline => inline.type === 'link');
    const newState = { hasLinks, linkNode };
    if (!value.isBlurred) {
      if (value.selection.isCollapsed) {
        const view = hasLinks ? 'linkPreview' : null;
        return { ...newState, view };
      }
      if (!value.isEmpty) {
        return { ...newState, view: 'buttons' };
      }
    }
    return { ...newState, view: null };
  }

  handleActionsSelectView = view => {
    this.setState({ view });
  };

  handlePostTextActionsLinkClose = focusEditor => {
    this.setState({ view: 'buttons' }, () => {
      if (focusEditor === true) this.props.onAction({ type: 'FOCUS' });
    });
  };

  handlePostTextActionsLinkSubmit = href => {
    this.props.onAction({ type: 'LINK', href });
  };

  handleKeyModK() {
    const { value } = this.props;
    if (value.selection.isCollapsed) {
      const { linkNode } = this.state;
      if (!linkNode) return;
      const href = linkNode.data.get('href');
      // TODO: Use router push for web links.
      window.open(href);
      return;
    }
    if (value.isEmpty) return;
    if (this.state.hasLinks) {
      this.props.onAction({ type: 'LINK', href: null });
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
          <PostTextActionsButtons
            value={value}
            onAction={onAction}
            onSelectView={this.handleActionsSelectView}
            hasLinks={this.state.hasLinks}
          />
        );
      case 'link':
        return (
          <PostTextActionsLink
            onClose={this.handlePostTextActionsLinkClose}
            onSubmit={this.handlePostTextActionsLinkSubmit}
          />
        );
      case 'linkPreview': {
        const { linkNode } = this.state;
        if (!linkNode) return;
        const href = linkNode.data.get('href');
        return <PostTextActionsLinkPreview href={href} />;
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
      <View style={[this.props.theme.styles.postTextActions, { left, top }]}>
        {view}
      </View>,
      el,
    );
  }
}

// This is workaround for https://github.com/este/este/issues/1571
export type PostTextActionsType = typeof PostTextActions;

export default withTheme(PostTextActions);
