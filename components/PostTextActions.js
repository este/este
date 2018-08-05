// @flow
/* eslint-env browser */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';
import type { MarkType, BlockNodeType } from './PostText';
import PostTextActionsLink from './PostTextActionsLink';

export type PostTextAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |}
  | {| type: 'BLOCKQUOTE' |}
  | {| type: 'LINK', href: string |}
  | {| type: 'FOCUS' |};

type PostTextActionsView = 'actions' | 'link';

type SlateObject = Object;

type ActionButtonProps = {|
  isActive: boolean,
  onPress: () => void,
  theme: Theme,
  children: React.Node,
|};

const handlePreventDefault = event => event.preventDefault();

const ActionButton = withTheme(
  ({ isActive, onPress, theme, children }: ActionButtonProps) => {
    const color = isActive ? 'success' : 'gray';
    return (
      <Button
        onPressIn={handlePreventDefault}
        onPress={onPress}
        color={color}
        bold
        style={theme.styles.postTextActionsButton}
      >
        {children}
      </Button>
    );
  },
);

type MarkButtonProps = {|
  activeMarks: Array<Object>,
  onPress: () => void,
  markType: MarkType,
  children: React.Node,
|};

const MarkButton = ({
  activeMarks,
  onPress,
  markType,
  children,
}: MarkButtonProps) => {
  const isActive = activeMarks.some(mark => mark.type === markType);
  return (
    <ActionButton onPress={onPress} isActive={isActive}>
      {children}
    </ActionButton>
  );
};

type BlockButtonProps = {|
  blocks: Object,
  onPress: () => void,
  blockType: BlockNodeType,
  children: React.Node,
|};

const BlockButton = ({
  blocks,
  onPress,
  blockType,
  children,
}: BlockButtonProps) => {
  const isActive = blocks.some(node => node.type === blockType);
  return (
    <ActionButton onPress={onPress} isActive={isActive}>
      {children}
    </ActionButton>
  );
};

const LinkButton = ({ inlines, onPress }) => {
  const isActive = inlines.some(inline => inline.type === 'link');
  return (
    <ActionButton isActive={isActive} onPress={onPress}>
      →
    </ActionButton>
  );
};

type ActionsProps = {|
  value: SlateObject,
  onAction: PostTextAction => void,
  onSelectView: PostTextActionsView => void,
|};

class Actions extends React.PureComponent<ActionsProps> {
  handleHeadingOnePress = () => {
    this.props.onAction({ type: 'HEADING-ONE' });
  };

  handleHeadingTwoPress = () => {
    this.props.onAction({ type: 'HEADING-TWO' });
  };

  handleBlockquotePress = () => {
    this.props.onAction({ type: 'BLOCKQUOTE' });
  };

  handleBoldPress = () => {
    this.props.onAction({ type: 'BOLD' });
  };

  handleItalicPress = () => {
    this.props.onAction({ type: 'ITALIC' });
  };

  handleLinkPress = () => {
    this.props.onSelectView('link');
  };

  render() {
    const { value } = this.props;
    const noBlockEdit = value.startBlock.type === 'listItem';
    return (
      <>
        {!noBlockEdit && (
          <>
            <BlockButton
              onPress={this.handleHeadingOnePress}
              blockType="headingOne"
              blocks={value.blocks}
            >
              1
            </BlockButton>
            <BlockButton
              onPress={this.handleHeadingTwoPress}
              blockType="headingTwo"
              blocks={value.blocks}
            >
              2
            </BlockButton>
            <BlockButton
              onPress={this.handleBlockquotePress}
              blockType="blockquote"
              blocks={value.blocks}
            >
              {'"'}
            </BlockButton>
          </>
        )}
        <MarkButton
          onPress={this.handleBoldPress}
          markType="bold"
          activeMarks={value.activeMarks}
        >
          b
        </MarkButton>
        <MarkButton
          onPress={this.handleItalicPress}
          markType="italic"
          activeMarks={value.activeMarks}
        >
          i
        </MarkButton>
        <LinkButton onPress={this.handleLinkPress} inlines={value.inlines} />
      </>
    );
  }
}

type PostTextActionsProps = {|
  value: SlateObject,
  onAction: (action: PostTextAction) => void,
  theme: Theme,
|};

type PostTextActionsState = {|
  left: ?number,
  top: ?number,
  view: PostTextActionsView,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  state = {
    left: null,
    top: null,
    view: 'actions',
  };

  componentDidMount() {
    this.el = window.document.createElement('div');
    this.modalRoot = window.document.getElementById('__next');
    this.modalRoot.appendChild(this.el);
    this.maybeSetLeftTopState();
  }

  componentDidUpdate() {
    // setState in componentDidUpdate is valid for tooltips.
    // https://reactjs.org/docs/react-component.html#componentdidmount
    this.maybeSetLeftTopState();
  }

  componentWillUnmount() {
    if (this.modalRoot && this.el) this.modalRoot.removeChild(this.el);
  }

  setLinkView() {
    this.setState({ view: 'link' });
  }

  handleActionsSelectView = (view: PostTextActionsView) => {
    this.setState({ view });
  };

  handlePostTextActionsLinkCancel = focusEditor => {
    this.setState({ view: 'actions' }, () => {
      if (focusEditor === true) this.props.onAction({ type: 'FOCUS' });
    });
  };

  modalRoot: ?HTMLDivElement;
  el: ?HTMLDivElement;

  maybeSetLeftTopState() {
    if (!this.canReadLeftTop()) return;
    const selectionRect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    this.setState({
      left: selectionRect.left,
      top: window.pageYOffset + selectionRect.bottom,
    });
  }

  canReadLeftTop() {
    const { value } = this.props;
    return this.state.view === 'actions' && !value.isEmpty && !value.isBlurred;
  }

  shouldRenderView() {
    const { value } = this.props;
    const { view } = this.state;
    switch (view) {
      case 'actions':
        return !value.isEmpty && !value.isBlurred;
      case 'link':
        // Because TextInput steals the focus.
        return !value.isEmpty;
      default:
        // eslint-disable-next-line no-unused-expressions
        (view: empty);
    }
  }

  renderView() {
    const { value, onAction } = this.props;
    const { view } = this.state;
    switch (view) {
      case 'actions':
        return (
          <Actions
            value={value}
            onAction={onAction}
            onSelectView={this.handleActionsSelectView}
          />
        );
      case 'link':
        return (
          <PostTextActionsLink
            onCancel={this.handlePostTextActionsLinkCancel}
          />
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        (view: empty);
        return null;
    }
  }

  render() {
    const { theme } = this.props;
    const { left, top } = this.state;
    const { el } = this;
    if (!el || left == null || top == null) return null;
    if (!this.shouldRenderView()) return null;

    return ReactDOM.createPortal(
      <View style={[theme.styles.postTextActions, { left, top }]}>
        {this.renderView()}
      </View>,
      el,
    );
  }
}

// This is workaround for https://github.com/este/este/issues/1571
export type PostTextActionsType = typeof PostTextActions;

export default withTheme(PostTextActions);
