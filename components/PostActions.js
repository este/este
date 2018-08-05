// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from './core/Row';
import Button from './core/Button';

type PostAction =
  | {| type: 'EXPAND', value: boolean |}
  | {| type: 'REUSE' |}
  | {| type: 'MOVE' |};

type PostActionsProps = {|
  theme: Theme,
  expanded: boolean,
  showReuse: boolean,
  onAction: (action: PostAction) => void,
|};

class PostActions extends React.PureComponent<PostActionsProps> {
  handleExpandButtonPress = () => {
    this.props.onAction({ type: 'EXPAND', value: true });
  };

  handleReuseButtonPress = () => {
    this.props.onAction({ type: 'REUSE' });
  };

  handleMoveButtonPress = () => {
    this.props.onAction({ type: 'MOVE' });
  };

  render() {
    return (
      <View style={this.props.theme.styles.postActions}>
        {!this.props.expanded ? (
          <Row>
            <Button onPress={this.handleExpandButtonPress}>—</Button>
          </Row>
        ) : (
          <Row>
            {this.props.showReuse && (
              <Button onPress={this.handleReuseButtonPress}>
                <FormattedMessage
                  defaultMessage="Reuse"
                  id="postActions.buttons.reuse"
                />
              </Button>
            )}
            <Button color="primary" onPress={this.handleMoveButtonPress}>
              <FormattedMessage
                defaultMessage="Move"
                id="postActions.buttons.move"
              />
            </Button>
          </Row>
        )}
      </View>
    );
  }
}

export default withTheme(PostActions);
