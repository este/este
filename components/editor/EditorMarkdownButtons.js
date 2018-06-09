// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Button from '../core/Button';
import Row from '../core/Row';

type EditorMarkdownButtonsProps = {|
  theme: Theme,
  selectionIsCollapsed: boolean,
  onReusePress: () => void,
|};

class EditorMarkdownButtons extends React.PureComponent<
  EditorMarkdownButtonsProps,
> {
  render() {
    return (
      <View style={this.props.theme.styles.editorMarkdownButtons}>
        <Row>
          <Button
            disabled={this.props.selectionIsCollapsed}
            inline
            color="primary"
            onPress={this.props.onReusePress}
          >
            <FormattedMessage
              defaultMessage="reuse"
              id="editorMarkdown.button.reuse"
            />
          </Button>
        </Row>
      </View>
    );
  }
}

export default withTheme(EditorMarkdownButtons);
