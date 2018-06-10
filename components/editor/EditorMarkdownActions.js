// @flow
import * as React from 'react';
import { View, findNodeHandle } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from '../core/Row';
import EditorMarkdownActionsButton from './EditorMarkdownActionsButton';

type EditorMarkdownActionsProps = {|
  expanded: boolean,
  theme: Theme,
  selectionIsCollapsed: boolean,
  onToggle: () => void,
  onExample: () => void,
  onReuse: () => void,
|};

class EditorMarkdownActions extends React.PureComponent<
  EditorMarkdownActionsProps,
> {
  buttonsRef = React.createRef();

  // DOM side effect can be called from parent component via ref.
  // https://github.com/necolas/react-native-web/blob/master/packages/website/guides/accessibility.md#spatial-navigation
  focusFirstIfExpanded() {
    if (!this.props.expanded) return;
    const component = this.buttonsRef.current;
    if (!component) return;
    const node = findNodeHandle(component);
    // React Native
    if (node == null || typeof node === 'number') return;
    if (typeof node.querySelectorAll !== 'function') return;
    const elements = node.querySelectorAll('[data-focusable="true"]');
    const first = elements[0];
    if (!first || typeof first.focus !== 'function') return;
    first.focus();
  }

  render() {
    return (
      <View style={this.props.theme.styles.editorMarkdownButtons}>
        {!this.props.expanded ? (
          <EditorMarkdownActionsButton onPress={this.props.onToggle}>
            ■
          </EditorMarkdownActionsButton>
        ) : (
          <Row ref={this.buttonsRef}>
            {!this.props.selectionIsCollapsed && (
              <EditorMarkdownActionsButton onPress={this.props.onReuse}>
                <FormattedMessage
                  defaultMessage="Reuse"
                  id="editorMarkdown.buttons.reuse"
                />
              </EditorMarkdownActionsButton>
            )}
            <EditorMarkdownActionsButton onPress={this.props.onExample}>
              <FormattedMessage
                defaultMessage="Example"
                id="editorMarkdown.buttons.example"
              />
            </EditorMarkdownActionsButton>
          </Row>
        )}
      </View>
    );
  }
}

export default withTheme(EditorMarkdownActions);
