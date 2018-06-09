// @flow
import * as React from 'react';
import { View, TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { defineMessages, FormattedMessage, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';
import Button from '../core/Button';
import Row from '../core/Row';

const messages = defineMessages({
  placeholder: {
    defaultMessage: `# Heading 1

Markdown is a simple way to format text that looks great on any device.

## Examples

A paragraph with *italic*, **bold**, and [link](https://a.com).

![Image](https://a.com/a.png)

> Blockquote

* List
* List

1. One
2. Two
`,
    id: 'editor.placeholder',
  },
});

type ButtonsProps = {|
  theme: Theme,
  selectionIsCollapsed: boolean,
  onReusePress: () => void,
|};

class Buttons extends React.PureComponent<ButtonsProps> {
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

type EditorMarkdownProps = {|
  theme: Theme,
  intl: IntlShape,
  value: string,
|};

type EditorMarkdownState = {|
  selection: { start: number, end: number },
|};

class EditorMarkdown extends React.PureComponent<
  EditorMarkdownProps,
  EditorMarkdownState,
> {
  state = {
    selection: { start: 0, end: 0 },
  };
  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
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

  handleChange = () => {
    this.adjustHeight();
  };

  handleSelection = ({ nativeEvent: { selection } }) => {
    this.setState({ selection });
  };

  handleReusePress = () => {
    // console.log(this.state.selection);
  };

  inputRef = React.createRef();

  selectionIsCollapsed() {
    const { selection } = this.state;
    return selection.start === selection.end;
  }

  render() {
    const { theme, intl, value } = this.props;
    const { selection } = this.state;
    return (
      <View>
        <TextInput
          multiline
          // value={value}
          defaultValue={value}
          onChange={this.handleChange}
          onSelectionChange={this.handleSelection}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder={intl.formatMessage(messages.placeholder)}
          ref={this.inputRef}
          // https://github.com/facebook/draft-js/issues/616#issuecomment-343596615
          // It breaks tab navigation.
          data-enable-grammarly="false"
          style={[
            theme.styles.editorMarkdownTextInput,
            theme.typography.fontSizeWithLineHeight(0),
          ]}
          selection={selection}
        />
        <Buttons
          theme={theme}
          selectionIsCollapsed={this.selectionIsCollapsed()}
          onReusePress={this.handleReusePress}
        />
      </View>
    );
  }
}

export default withIntl(withTheme(EditorMarkdown));
