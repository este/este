// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from './core/Row';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';

type EditorBreadcrumbDetailProps = {|
  node: Object,
  theme: Theme,
|};

type Detail = 'styles' | 'props' | 'move';

type EditorBreadcrumbDetailState = {|
  detail: ?Detail,
|};

class EditorBreadcrumbDetail extends React.PureComponent<
  EditorBreadcrumbDetailProps,
  EditorBreadcrumbDetailState,
> {
  state = {
    detail: null,
  };

  handleStylesPress = () => {
    this.setState({ detail: 'styles' });
  };

  handlePropsPress = () => {
    this.setState({ detail: 'props' });
  };

  handleMovePress = () => {
    this.setState({ detail: 'move' });
  };

  handleCloseDetailPress = () => {
    this.setState({ detail: null });
  };

  render() {
    // const { node, theme } = this.props;
    const { theme } = this.props;
    // const style = node.data.get('style');
    // if (style == null) return null;

    return (
      <View style={theme.styles.editorBreadcrumbDetail}>
        {this.state.detail == null ? (
          <Row rhythm={0.5}>
            <EditorBreadcrumbButton onPress={this.handleStylesPress}>
              <FormattedMessage defaultMessage="styles" id="button.styles" />
            </EditorBreadcrumbButton>
            <EditorBreadcrumbButton disabled onPress={this.handlePropsPress}>
              <FormattedMessage defaultMessage="props" id="button.props" />
            </EditorBreadcrumbButton>
            <EditorBreadcrumbButton disabled onPress={this.handleMovePress}>
              <FormattedMessage defaultMessage="move" id="button.move" />
            </EditorBreadcrumbButton>
          </Row>
        ) : (
          <EditorBreadcrumbButton onPress={this.handleCloseDetailPress}>
            ‥
          </EditorBreadcrumbButton>
        )}
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumbDetail);
