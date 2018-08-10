// @flow
/* eslint-env browser */
import * as React from 'react';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';
import type { MarkType, BlockNodeType } from './PostText';
import type { PostTextAction, PostTextActionsView } from './PostTextActions';

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
        size={-1}
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

const LinkButton = ({ isActive, onPress }) => {
  return (
    <ActionButton isActive={isActive} onPress={onPress}>
      →
    </ActionButton>
  );
};

type PostTextActionsButtonsProps = {|
  value: Object,
  hasLinks: boolean,
  onAction: PostTextAction => void,
  onSelectView: PostTextActionsView => void,
|};

class PostTextActionsButtons extends React.PureComponent<
  PostTextActionsButtonsProps,
> {
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
    if (this.props.hasLinks) {
      this.props.onAction({ type: 'LINK', href: null });
    } else {
      this.props.onSelectView('link');
    }
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
        <LinkButton
          onPress={this.handleLinkPress}
          isActive={this.props.hasLinks}
        />
      </>
    );
  }
}

export default PostTextActionsButtons;
