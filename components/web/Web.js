// @flow
import * as React from 'react';
// import { View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Web.graphql';
// import WebTitle from './PageTitle';
import Head from 'next/head';

type WebProps = {|
  data: generated.Web,
|};

class Web extends React.PureComponent<WebProps> {
  render() {
    const {
      data: { web },
    } = this.props;
    if (web == null) return null;
    return (
      <>
        <Head>
          <title>{web.name}</title>
        </Head>
        {/* <View>
          <WebTitle pageId={page.id} defaultValue={page.title} />
          <WebMarkdown />
        </View> */}
      </>
    );
  }
}

export default createFragmentContainer(
  Web,
  graphql`
    fragment Web on Query @argumentDefinitions(id: { type: "ID!" }) {
      web(id: $id) {
        id
        name
      }
    }
  `,
);
