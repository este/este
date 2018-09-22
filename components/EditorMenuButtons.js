// @flow
/* eslint-env browser */
import * as React from 'react';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';
import type { MarkType, BlockNodeType, OnEditorAction } from './Editor';
import type { EditorMenuView } from './EditorMenu';

type MenuButtonProps = {|
  isActive: boolean,
  onPress: Event => void,
  theme: Theme,
  children: React.Node,
|};

const MenuButton = withTheme(
  class extends React.PureComponent<MenuButtonProps> {
    handlePressIn = event => {
      event.preventDefault();
      this.props.onPress(event);
    };
    render() {
      const { isActive, theme, children } = this.props;
      const color = isActive ? 'success' : 'gray';
      return (
        <Button
          onPressIn={this.handlePressIn}
          color={color}
          bold
          style={theme.styles.editorMenuButton}
          size={-1}
        >
          {children}
        </Button>
      );
    }
  },
);

type MarkButtonProps = {|
  activeMarks: Array<Object>,
  onPress: Event => void,
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
    <MenuButton onPress={onPress} isActive={isActive}>
      {children}
    </MenuButton>
  );
};

type BlockButtonProps = {|
  blocks: Object,
  onPress: Event => void,
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
    <MenuButton onPress={onPress} isActive={isActive}>
      {children}
    </MenuButton>
  );
};

const LinkButton = ({ isActive, onPress }) => {
  return (
    <MenuButton isActive={isActive} onPress={onPress}>
      →
    </MenuButton>
  );
};

type EditorMenuButtonsProps = {|
  value: Object,
  hasLinks: boolean,
  onEditorAction: OnEditorAction,
  onSelectView: EditorMenuView => void,
|};

class EditorMenuButtons extends React.PureComponent<EditorMenuButtonsProps> {
  handleHeadingOnePress = () => {
    this.props.onEditorAction({ type: 'HEADING-ONE' });
  };

  handleHeadingTwoPress = () => {
    this.props.onEditorAction({ type: 'HEADING-TWO' });
  };

  handleBlockquotePress = () => {
    this.props.onEditorAction({ type: 'BLOCKQUOTE' });
  };

  handleBoldPress = () => {
    this.props.onEditorAction({ type: 'BOLD' });
  };

  handleItalicPress = () => {
    this.props.onEditorAction({ type: 'ITALIC' });
  };

  handleLinkPress = () => {
    if (this.props.hasLinks) {
      this.props.onEditorAction({ type: 'LINK', href: null });
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

export default EditorMenuButtons;
