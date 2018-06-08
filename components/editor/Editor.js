// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import EditorMarkdown from './EditorMarkdown';
import Heading from '../core/Heading';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Editor.graphql';

const testValue = `[Home](/home) | [About](/about)

# Titulek

Odstavec.

Made by steida`;

type EditorProps = {|
  theme: Theme,
  data: generated.Editor,
|};

class Editor extends React.PureComponent<EditorProps> {
  // handleChange = () => {
  // };

  render() {
    const { web } = this.props.data;
    if (web == null) return null;
    const { theme } = this.props;
    return (
      <View style={theme.styles.editor}>
        <Heading size={1}>{web.name}</Heading>
        <EditorMarkdown value={testValue} />
      </View>
    );
  }
}

export default createFragmentContainer(
  withTheme(Editor),
  graphql`
    fragment Editor on Query @argumentDefinitions(domain: { type: "String!" }) {
      web(domain: $domain) {
        name
      }
    }
  `,
);
