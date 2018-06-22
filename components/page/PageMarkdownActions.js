// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { FormattedMessage } from 'react-intl';
import Row from '../core/Row';
import PageMarkdownActionsButton from './PageMarkdownActionsButton';
import getFocusableNodes from '../../client/getFocusableNodes';

type PageMarkdownActionsProps = {|
  expanded: boolean,
  theme: Theme,
  selectionIsCollapsed: boolean,
  onToggle: () => void,
  onExample: () => void,
  onReuse: () => void,
  onEscape: () => void,
|};

class PageMarkdownActions extends React.PureComponent<
  PageMarkdownActionsProps,
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

  handleViewKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onEscape();
    }
  };

  render() {
    return (
      <View
        style={this.props.theme.styles.pageMarkdownButtons}
        onKeyDown={this.handleViewKeyDown}
      >
        {!this.props.expanded ? (
          <Row>
            <PageMarkdownActionsButton onPress={this.props.onToggle}>
              —
            </PageMarkdownActionsButton>
          </Row>
        ) : (
          <Row ref={this.buttonsRef}>
            {!this.props.selectionIsCollapsed && (
              <PageMarkdownActionsButton onPress={this.props.onReuse}>
                <FormattedMessage
                  defaultMessage="Reuse"
                  id="pageMarkdown.buttons.reuse"
                />
              </PageMarkdownActionsButton>
            )}
            <PageMarkdownActionsButton onPress={this.props.onExample}>
              <FormattedMessage
                defaultMessage="Example"
                id="pageMarkdown.buttons.example"
              />
            </PageMarkdownActionsButton>
          </Row>
        )}
      </View>
    );
  }
}

export default withTheme(PageMarkdownActions);
