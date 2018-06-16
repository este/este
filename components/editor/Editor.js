// @flow
import * as React from 'react';
import { View, findNodeHandle } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import EditorMarkdown from './EditorMarkdown';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Editor.graphql';
import EditorPageTitle from './EditorPageTitle';

export const getFocusableNodes = (instance: Object): Array<HTMLElement> => {
  const node = findNodeHandle(instance);
  // TODO: React Native
  if (node == null || typeof node === 'number') return [];
  if (typeof node.querySelectorAll !== 'function') return [];
  return [...node.querySelectorAll('[data-focusable="true"]')];
};

type EditorProps = {|
  theme: Theme,
  data: generated.Editor,
|};

class Editor extends React.PureComponent<EditorProps> {
  componentDidMount() {
    const node = getFocusableNodes(this)[1];
    if (node) node.focus();
  }

  render() {
    const {
      theme,
      data: { page },
    } = this.props;
    if (page == null) return null;
    return (
      <View style={theme.styles.editor}>
        {/*
          defaultValue because component is uncontrolled. This is fine for now.
          https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
        */}
        <EditorPageTitle pageId={page.id} defaultValue={page.title} />
        <EditorMarkdown />
      </View>
    );
  }
}

export default createFragmentContainer(
  withTheme(Editor),
  graphql`
    fragment Editor on Query @argumentDefinitions(pageId: { type: "ID!" }) {
      page(pageId: $pageId) {
        id
        title
      }
    }
  `,
);
