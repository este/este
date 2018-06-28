// @flow
import * as React from 'react';
import { View, TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import PageMarkdownActions from './PageMarkdownActions';
// import withConfirm, { type Confirm } from '../core/withConfirm';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'pageMarkdown.textInput.placeholder',
  },
  // TODO: [Home](/) | [About](/)
  example: {
    defaultMessage: `
# Example

Markdown is a simple way to *format* text that looks **great** on any device.

* List
* List

1. One
2. Two

> Blockquote

made by [steida](https://twitter.com/steida)
`,
    id: 'pageMarkdown.textInput.example',
  },
});

type PageMarkdownProps = {|
  theme: Theme,
  intl: IntlShape,
  // confirm: Confirm,
|};

type PageMarkdownState = {|
  selection: { start: number, end: number },
  actionsAreExpanded: boolean,
  value: string,
|};

class PageMarkdown extends React.PureComponent<
  PageMarkdownProps,
  PageMarkdownState,
> {
  state = {
    selection: { start: 0, end: 0 },
    actionsAreExpanded: false,
    value: '',
  };

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value) {
      this.adjustHeight();
    }
  }

  adjustHeight() {
    const { current } = this.inputRef;
    if (!current) return;
    current.setNativeProps({
      style: { height: 0 },
    });
    current.setNativeProps({
      // eslint-disable-next-line no-underscore-dangle
      style: { height: current._node.scrollHeight },
    });
  }

  handleTextInputChangeText = text => {
    this.setState({ value: text }, () => {
      this.adjustHeight();
    });
  };

  handleTextInputSelectionChange = ({ nativeEvent: { selection } }) => {
    this.setState({ selection });
  };

  handleTextInputFocus = () => {
    this.setState({ actionsAreExpanded: false });
  };

  handleActionsToggle = () => {
    this.setState(
      prevState => ({
        actionsAreExpanded: !prevState.actionsAreExpanded,
      }),
      () => {
        const { current } = this.actionsRef;
        if (!current) return;
        current.focusFirstIfExpanded();
      },
    );
  };

  focusTextInput = () => {
    const { current } = this.inputRef;
    if (!current || typeof current.focus !== 'function') return;
    current.focus();
  };

  handleActionsExample = () => {
    this.setState(prevState => {
      // Trim and \n for normalized lines.
      const example = this.props.intl.formatMessage(messages.example).trim();
      const value =
        prevState.value.length === 0
          ? example
          : `${prevState.value}\n${example}`;
      return { value: `${value}` };
    }, this.focusTextInput);
  };

  handleActionsReuse = () => {};

  handleActionsEscape = () => {
    this.focusTextInput();
  };

  inputRef = React.createRef();

  actionsRef = React.createRef();

  selectionIsCollapsed() {
    const { selection } = this.state;
    return selection.start === selection.end;
  }

  render() {
    const { theme, intl } = this.props;

    return (
      <View style={theme.styles.pageMarkdown}>
        <TextInput
          // https://github.com/necolas/react-native-web/issues/988
          // autoFocus
          multiline
          value={this.state.value}
          onChangeText={this.handleTextInputChangeText}
          onSelectionChange={this.handleTextInputSelectionChange}
          onFocus={this.handleTextInputFocus}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder={intl.formatMessage(messages.placeholder)}
          ref={this.inputRef}
          // https://github.com/facebook/draft-js/issues/616#issuecomment-343596615
          // It breaks tab navigation.
          data-enable-grammarly="false"
          style={[
            theme.styles.pageMarkdownTextInput,
            theme.typography.fontSizeWithLineHeight(0),
          ]}
          // https://github.com/necolas/react-native-web/issues/988
          // selection={this.state.selection}
        />
        <PageMarkdownActions
          expanded={this.state.actionsAreExpanded}
          selectionIsCollapsed={this.selectionIsCollapsed()}
          ref={this.actionsRef}
          onToggle={this.handleActionsToggle}
          onExample={this.handleActionsExample}
          onReuse={this.handleActionsReuse}
          onEscape={this.handleActionsEscape}
        />
      </View>
    );
  }
}

// export default withConfirm(injectIntl(withTheme(PageMarkdown)));
export default withTheme(injectIntl(PageMarkdown));
