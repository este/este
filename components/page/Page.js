// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import PageMarkdown from './PageMarkdown';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Page.graphql';
import PageTitle from './PageTitle';
import Head from 'next/head';
import EditMainNav from '../EditMainNav';

type PageProps = {|
  theme: Theme,
  data: generated.Page,
|};

class Page extends React.PureComponent<PageProps> {
  render() {
    const {
      theme,
      data: { page },
    } = this.props;
    if (page == null) return null;
    const { web } = page;
    return (
      <>
        <Head>
          <title>{page.title}</title>
        </Head>
        <EditMainNav webId={web.id} webName={web.name} />
        <View style={theme.styles.page}>
          <PageTitle pageId={page.id} defaultValue={page.title} />
          <PageMarkdown />
        </View>
      </>
    );
  }
}

export default createFragmentContainer(
  withTheme(Page),
  graphql`
    fragment Page on Query @argumentDefinitions(id: { type: "ID!" }) {
      page(id: $id) {
        id
        title
        web {
          id
          name
        }
      }
    }
  `,
);
