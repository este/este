// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from '../core/Row';
import PostActionsButton from './PostActionsButton';

type PostActionsProps = {|
  theme: Theme,
  expanded: boolean,
  showReuse: boolean,
  onExpand: (expand: boolean) => void,
  onExample: () => void,
  onReuse: () => void,
  onMove: () => void,
|};

class PostActions extends React.PureComponent<PostActionsProps> {
  handleViewKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.onExpand(false);
    }
  };

  handleExpandButtonPress = () => {
    this.props.onExpand(true);
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
              <PostActionsButton onPress={this.props.onReuse}>
                <FormattedMessage
                  defaultMessage="Reuse"
                  id="postActions.buttons.reuse"
                />
              </PostActionsButton>
            )}
            <PostActionsButton onPress={this.props.onMove}>
              <FormattedMessage
                defaultMessage="Move"
                id="postActions.buttons.move"
              />
            </PostActionsButton>
            <PostActionsButton onPress={this.props.onExample}>
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
