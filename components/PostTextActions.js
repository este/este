// @flow
/* eslint-env browser */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import PostTextActionsButtons from './PostTextActionsButtons';
import PostTextActionsLink from './PostTextActionsLink';

export type PostTextAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |}
  | {| type: 'BLOCKQUOTE' |}
  | {| type: 'LINK', href: ?string |}
  | {| type: 'FOCUS' |};

export type PostTextActionsView = 'buttons' | 'link';

type PostTextActionsProps = {|
  value: Object,
  onAction: (action: PostTextAction) => void,
  theme: Theme,
|};

type PostTextActionsState = {|
  left: number,
  top: number,
  view: PostTextActionsView,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  // For some reason, probably Flow bug, the state defined as property
  // initializer breaks type checking. Only in this file, so it's probably some
  // race condition.
  // state = {
  //   left: 0,
  //   top: 0,
  //   view: 'buttons',
  // }

  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      view: 'buttons',
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

  handleActionsSelectView = view => {
    this.setState({ view });
  };

  handlePostTextActionsLinkCancel = focusEditor => {
    this.setState({ view: 'buttons' }, () => {
      if (focusEditor === true) this.props.onAction({ type: 'FOCUS' });
    });
  };

  handlePostTextActionsLinkSubmit = href => {
    this.setState({ view: 'buttons' }, () => {
      this.props.onAction({ type: 'LINK', href });
    });
  };

  hasLinks() {
    const { value } = this.props;
    return value.inlines.some(inline => inline.type === 'link');
  }

  toggleLinks() {
    if (this.hasLinks()) {
      this.props.onAction({ type: 'LINK', href: null });
    } else {
      this.setState({ view: 'link' });
    }
  }

  modalRoot: ?HTMLDivElement;
  el: ?HTMLDivElement;

  shouldShowButtons() {
    const { value } = this.props;
    return !value.isEmpty && !value.isBlurred;
  }

  maybeUpdateLeftTopState() {
    const { view } = this.state;
    switch (view) {
      case 'buttons': {
        if (!this.shouldShowButtons()) return;
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
        // // console.log(this.hasLinks());
        // return;
        break;
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (view: empty);
        return null;
    }
  }

  renderView() {
    const { value, onAction } = this.props;
    const { view } = this.state;
    switch (view) {
      case 'buttons': {
        return this.shouldShowButtons() ? (
          <PostTextActionsButtons
            value={value}
            onAction={onAction}
            onSelectView={this.handleActionsSelectView}
            hasLinks={this.hasLinks()}
          />
        ) : null;
      }
      case 'link':
        // It's closed on blur, so we don't have to check anything.
        return (
          <PostTextActionsLink
            onCancel={this.handlePostTextActionsLinkCancel}
            onSubmit={this.handlePostTextActionsLinkSubmit}
          />
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        (view: empty);
        return null;
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
