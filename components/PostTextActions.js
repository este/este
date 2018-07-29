// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';
import Spacer from './core/Spacer';
import withTheme, { type Theme } from './core/withTheme';
import type { Mark } from './PostText';

export type PostTextAction =
  | {| type: 'ESCAPE' |}
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |};

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

  handleBoldPress = () => {
    this.props.onAction({ type: 'BOLD' });
  };

  handleItalicPress = () => {
    this.props.onAction({ type: 'ITALIC' });
  };

  renderButton(markType: $ElementType<Mark, 'type'>, onPress, props) {
    const hasMark = this.props.value.activeMarks.some(
      mark => mark.type === markType,
    );
    const color = hasMark ? 'white' : 'gray';
    return (
      <Button onPress={onPress} color={color} bold {...props}>
        {markType.charAt(0)}
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
          <Spacer rhythm={0.75}>
            {this.renderButton('bold', this.handleBoldPress)}
            {this.renderButton('italic', this.handleItalicPress, {
              italic: true,
            })}
          </Spacer>
        </View>
      </div>
    );
  }
}

export default withTheme(PostTextActions);
