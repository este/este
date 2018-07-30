// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';

export type PostTextAction =
  | {| type: 'ESCAPE' |}
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |};
// | {| type: 'LINK' |}
// | {| type: 'QUOTE' |}

type SlateObject = Object;

type PostTextActionsProps = {|
  value: SlateObject,
  position: ?[number, number],
  onAction: (action: PostTextAction) => void,
  theme: Theme,
|};

type PostTextActionsState = {|
  hasFocus: boolean,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  state = {
    hasFocus: false,
  };

  handleViewKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.onAction({ type: 'ESCAPE' });
    }
  };

  handleViewFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleViewBlur = () => {
    this.setState({ hasFocus: false });
  };

  handleBoldPress = () => this.props.onAction({ type: 'BOLD' });
  handleItalicPress = () => this.props.onAction({ type: 'ITALIC' });
  handleHeadingOnePress = () => this.props.onAction({ type: 'HEADING-ONE' });
  handleHeadingTwoPress = () => this.props.onAction({ type: 'HEADING-TWO' });

  renderButton(
    actionType: $ElementType<PostTextAction, 'type'>,
    icon,
    onPress,
  ) {
    const isMark = actionType === 'BOLD' || actionType === 'ITALIC';
    const isActive = isMark
      ? this.props.value.activeMarks.some(
          mark => mark.type === actionType.toLowerCase(),
        )
      : false;
    const color = isActive ? 'success' : 'gray';
    return (
      <Button
        onPress={onPress}
        color={color}
        bold
        style={this.props.theme.styles.postTextActionsButton}
      >
        {icon}
      </Button>
    );
  }

  render() {
    const { value, position, theme } = this.props;
    // isCollapsed is used instead of isEmpty as temp workaround.
    // https://github.com/ianstormtaylor/slate/issues/2004
    if (!position || value.isCollapsed) return null;
    const [left, top] = position;
    const hiddenStillFocusable = value.isBlurred && !this.state.hasFocus;
    return (
      <div className={hiddenStillFocusable && 'sr-only sr-only-focusable'}>
        {/* http://getbootstrap.com/docs/4.1/utilities/screenreaders */}
        <style jsx>{`
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
          .sr-only-focusable:active,
          .sr-only-focusable:focus {
            position: static;
            width: auto;
            height: auto;
            overflow: visible;
            clip: auto;
            white-space: normal;
          }
        `}</style>
        <View
          onKeyDown={this.handleViewKeyDown}
          style={[theme.styles.postTextActions, { left, top }]}
          onFocus={this.handleViewFocus}
          onBlur={this.handleViewBlur}
        >
          {this.renderButton('BOLD', 'B', this.handleBoldPress)}
          {this.renderButton('ITALIC', 'i', this.handleItalicPress)}
          {this.renderButton('HEADING-ONE', '1', this.handleHeadingOnePress)}
          {this.renderButton('HEADING-TWO', '2', this.handleHeadingTwoPress)}
          {/* {this.renderButton('bold', '↗')}
          {this.renderButton('bold', '“')} */}
        </View>
      </div>
    );
  }
}

export default withTheme(PostTextActions);
