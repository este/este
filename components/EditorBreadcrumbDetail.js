// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from './core/Row';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';
import EditorData from './EditorData';
import type { OnEditorAction } from './Editor';

type EditorBreadcrumbDetailProps = {|
  node: Object,
  theme: Theme,
  onEditorAction: OnEditorAction,
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

  handleEditorDataStyleChange = style => {
    this.props.onEditorAction({
      type: 'STYLE',
      nodeKey: this.props.node.key,
      style,
    });
  };

  renderDetail(detail) {
    switch (detail) {
      case 'styles': {
        const { node } = this.props;
        const style = node.data.get('style');
        return (
          <EditorData
            data={style}
            // Not controlled. Editor children have own state for fast typing.
            // Therefore, we have to reset component manually via key.
            // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
            key={node.key}
            onChange={this.handleEditorDataStyleChange}
          />
        );
      }
      case 'props':
        return null;
      case 'move':
        return null;
      default:
        // eslint-disable-next-line no-unused-expressions
        (detail: empty);
    }
  }

  render() {
    const { theme } = this.props;
    const { detail } = this.state;

    return (
      <View style={theme.styles.editorBreadcrumbDetail}>
        {detail == null ? (
          <Row rhythm={0.5} wrap>
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
          <Row rhythm={0.5} wrap>
            <EditorBreadcrumbButton onPress={this.handleCloseDetailPress}>
              ‥
            </EditorBreadcrumbButton>
            {this.renderDetail(detail)}
          </Row>
        )}
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumbDetail);
