// @flow
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';
import Spacer from './core/Spacer';
import withTheme, { type Theme } from './core/withTheme';

type PostTextAction = {| type: 'ESCAPE' |};

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

const ActionButton = props => {
  return <Button color="gray" bold fixWebFontSmoothing {...props} />;
};

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

  render() {
    const { value, position, theme } = this.props;
    if (!position || value.isEmpty) return null;
    const [left, top] = position;
    // Opacity 0, so element is still tabable.
    const opacity = value.isBlurred && !this.state.hasFocus ? 0 : 1;
    return (
      <View
        onKeyDown={this.handleViewKeyDown}
        style={[theme.styles.postTextActions, { left, top, opacity }]}
        onFocus={this.handleViewFocus}
        onBlur={this.handleViewBlur}
      >
        <Spacer rhythm={0.75}>
          <ActionButton>b</ActionButton>
          <ActionButton italic>i</ActionButton>
          <ActionButton>reuse</ActionButton>
        </Spacer>
      </View>
    );
  }
}

export default withTheme(PostTextActions);
