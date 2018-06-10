// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from '../core/Row';
import EditorMarkdownActionsButton from './EditorMarkdownActionsButton';
import { getFocusableNodes } from './Editor';

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

  // DOM side effect can be called from parent current via ref. That's fine.
  // https://github.com/necolas/react-native-web/blob/master/packages/website/guides/accessibility.md#spatial-navigation
  focusFirstIfExpanded() {
    if (!this.props.expanded) return;
    const { current } = this.buttonsRef;
    if (!current) return;
    const first = getFocusableNodes(current)[0];
    if (first) first.focus();
  }

  render() {
    return (
      <View style={this.props.theme.styles.editorMarkdownButtons}>
        {!this.props.expanded ? (
          <Row>
            <EditorMarkdownActionsButton onPress={this.props.onToggle}>
              ■
            </EditorMarkdownActionsButton>
          </Row>
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
