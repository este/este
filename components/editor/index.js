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

type EditorProps = {|
  theme: Theme,
  intl: IntlShape,
|};

// placeholder jako message, ok

class Editor extends React.PureComponent<EditorProps> {
  // handleChange = () => {
  // };

  render() {
    const { theme, intl } = this.props;
    const placeholderTextColor = colorLib(theme.colors[theme.textColor])
      .fade(0.5)
      .toString();
    const size = 0;
    return (
      <TextInput
        multiline
        // onChange={this.handleChange}
        placeholderTextColor={placeholderTextColor}
        placeholder={intl.formatMessage(messages.placeholder)}
        style={[
          theme.styles.editorTextInput,
          // jen v levo border, ok
          theme.typography.fontSizeWithLineHeight(size),
        ]}
      />
    );
  }
}

export default withIntl(withTheme(Editor));
