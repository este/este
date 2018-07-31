// @flow
/* eslint-env browser */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';
import type { MarkType, BlockNodeType } from './PostText';

export type PostTextAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |};
// | {| type: 'LINK' |}
// | {| type: 'QUOTE' |}

type PostTextActionType = $ElementType<PostTextAction, 'type'>;

type SlateObject = Object;

type OnAction = (action: PostTextAction) => void;

type ActionButtonProps = {|
  value: SlateObject,
  onAction: OnAction,
  action: PostTextActionType,
  isActive: boolean,
  children: React.Node,
  theme: Theme,
|};

class ActionButton extends React.PureComponent<ActionButtonProps> {
  handleButtonOnPressIn = (event: Event) => {
    event.preventDefault();
    // $FlowFixMe Probably Flow bug.
    this.props.onAction({ type: this.props.action });
  };
  render() {
    const { theme, isActive, children } = this.props;
    const color = isActive ? 'success' : 'gray';
    return (
      <Button
        onPressIn={this.handleButtonOnPressIn}
        color={color}
        bold
        style={theme.styles.postTextActionsButton}
      >
        {children}
      </Button>
    );
  }
}

const ActionButtonWithTheme = withTheme(ActionButton);

type MarkButtonProps = {
  value: SlateObject,
  onAction: OnAction,
  action: PostTextActionType,
  markType: MarkType,
  children: React.Node,
};

const MarkButton = ({
  value,
  onAction,
  action,
  markType,
  children,
}: MarkButtonProps) => {
  const isActive = value.activeMarks.some(mark => mark.type === markType);
  return (
    <ActionButtonWithTheme
      value={value}
      onAction={onAction}
      action={action}
      isActive={isActive}
    >
      {children}
    </ActionButtonWithTheme>
  );
};

type BlockButtonProps = {
  value: SlateObject,
  onAction: OnAction,
  action: PostTextActionType,
  blockType: BlockNodeType,
  children: React.Node,
};

const BlockButton = ({
  value,
  onAction,
  action,
  blockType,
  children,
}: BlockButtonProps) => {
  const isActive = value.blocks.some(node => node.type === blockType);
  return (
    <ActionButtonWithTheme
      value={value}
      onAction={onAction}
      action={action}
      isActive={isActive}
    >
      {children}
    </ActionButtonWithTheme>
  );
};

type PostTextActionsProps = {|
  value: SlateObject,
  onAction: (action: PostTextAction) => void,
  theme: Theme,
|};

type PostTextActionsState = {|
  left: ?number,
  top: ?number,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  state = {
    left: null,
    top: null,
  };

  componentDidMount() {
    this.el = window.document.createElement('div');
    this.modalRoot = window.document.getElementById('__next');
    this.modalRoot.appendChild(this.el);
    this.setLeftTopState();
  }

  componentDidUpdate() {
    // setState in componentDidUpdate is valid for tooltips.
    // https://reactjs.org/docs/react-component.html#componentdidmount
    this.setLeftTopState();
  }

  componentWillUnmount() {
    if (this.modalRoot && this.el) this.modalRoot.removeChild(this.el);
  }

  setLeftTopState() {
    const { value } = this.props;
    // isCollapsed is used instead of isEmpty as temp workaround.
    // https://github.com/ianstormtaylor/slate/issues/2004
    if (value.isBlurred || value.isCollapsed) {
      this.setState({ left: null, top: null });
      return;
    }
    const selectionRect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    this.setState({
      left: selectionRect.left,
      top: window.pageYOffset + selectionRect.bottom,
    });
  }

  el: ?HTMLDivElement;
  modalRoot: ?HTMLDivElement;

  render() {
    const el = this.el;
    const { value, onAction, theme } = this.props;
    const { left, top } = this.state;
    if (!el || left == null || top == null) return null;
    return ReactDOM.createPortal(
      <View style={[theme.styles.postTextActions, { left, top }]}>
        <BlockButton
          action="HEADING-ONE"
          blockType="headingOne"
          value={value}
          onAction={onAction}
        >
          1
        </BlockButton>
        <BlockButton
          action="HEADING-TWO"
          blockType="headingTwo"
          value={value}
          onAction={onAction}
        >
          2
        </BlockButton>
        <MarkButton
          action="BOLD"
          markType="bold"
          value={value}
          onAction={onAction}
        >
          B
        </MarkButton>
        <MarkButton
          action="ITALIC"
          markType="italic"
          value={value}
          onAction={onAction}
        >
          i
        </MarkButton>

        {/* {this.renderButton('BOLD', '↗')} */}
        {/* {this.renderButton('BOLD', '“')} */}
      </View>,
      el,
    );
  }
}

export default withTheme(PostTextActions);
