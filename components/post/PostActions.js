// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from '../core/Row';
import PostActionsButton from './PostActionsButton';

type PostAction =
  | {| type: 'EXPAND', value: boolean |}
  | {| type: 'EXAMPLE' |}
  | {| type: 'REUSE' |}
  | {| type: 'MOVE' |};

type PostActionsProps = {|
  theme: Theme,
  expanded: boolean,
  showReuse: boolean,
  onAction: (action: PostAction) => void,
|};

class PostActions extends React.PureComponent<PostActionsProps> {
  handleViewKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.onAction({ type: 'EXPAND', value: false });
    }
  };

  handleExpandButtonPress = () => {
    this.props.onAction({ type: 'EXPAND', value: true });
  };

  handleReuseButtonPress = () => {
    this.props.onAction({ type: 'REUSE' });
  };

  handleMoveButtonPress = () => {
    this.props.onAction({ type: 'MOVE' });
  };

  handleExampleButtonPress = () => {
    this.props.onAction({ type: 'EXAMPLE' });
  };

  render() {
    return (
      <View
        style={this.props.theme.styles.postActions}
        onKeyDown={this.handleViewKeyDown}
      >
        {!this.props.expanded ? (
          <Row>
            <PostActionsButton onPress={this.handleExpandButtonPress}>
              —
            </PostActionsButton>
          </Row>
        ) : (
          <Row>
            {this.props.showReuse && (
              <PostActionsButton onPress={this.handleReuseButtonPress}>
                <FormattedMessage
                  defaultMessage="Reuse"
                  id="postActions.buttons.reuse"
                />
              </PostActionsButton>
            )}
            <PostActionsButton onPress={this.handleMoveButtonPress}>
              <FormattedMessage
                defaultMessage="Move"
                id="postActions.buttons.move"
              />
            </PostActionsButton>
            <PostActionsButton onPress={this.handleExampleButtonPress}>
              <FormattedMessage
                defaultMessage="Example"
                id="postActions.buttons.example"
              />
            </PostActionsButton>
          </Row>
        )}
      </View>
    );
  }
}

export default withTheme(PostActions);
