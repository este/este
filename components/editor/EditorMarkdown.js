// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import colorLib from 'color';
import { defineMessages, type IntlShape } from 'react-intl';
import withIntl from '../core/withIntl';

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

type EditorMarkdownProps = {|
  theme: Theme,
  intl: IntlShape,
  value: string,
|};

class EditorMarkdown extends React.PureComponent<EditorMarkdownProps> {
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

  inputRef = React.createRef();

  render() {
    const { theme, intl, value } = this.props;
    // TODO: Move to derived state.
    const placeholderTextColor = colorLib(theme.colors[theme.textColor])
      .fade(0.5)
      .toString();
    return (
      <TextInput
        multiline
        // value={value}
        defaultValue={value}
        onChange={this.handleChange}
        placeholderTextColor={placeholderTextColor}
        placeholder={intl.formatMessage(messages.placeholder)}
        ref={this.inputRef}
        // https://github.com/facebook/draft-js/issues/616#issuecomment-343596615
        // It breaks tab navigation.
        data-enable-grammarly="false"
        style={[
          theme.styles.editorMarkdown,
          theme.typography.fontSizeWithLineHeight(0),
        ]}
      />
    );
  }
}

export default withIntl(withTheme(EditorMarkdown));
