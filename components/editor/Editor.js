// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import EditorMarkdown from './EditorMarkdown';

const testValue = `[Home](/home) | [About](/about)

# Titulek

Odstavec.

Made by steida`;

type EditorProps = {|
  theme: Theme,
|};

class Editor extends React.PureComponent<EditorProps> {
  // handleChange = () => {
  // };

  render() {
    const { theme } = this.props;
    return (
      <View style={theme.styles.editor}>
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
        <EditorMarkdown value={testValue} />
      </View>
    );
  }
}

export default withTheme(Editor);
