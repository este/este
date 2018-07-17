// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Web.graphql';
import Head from 'next/head';
import WebName from './WebName';
import EditMainNav from './EditMainNav';
import Block from './core/Block';
import Row from './core/Row';
import DeleteWeb from './DeleteWeb';
import WebPosts from './WebPosts';

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
          <title>{web.draftName}</title>
        </Head>
        {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
        <EditMainNav data={web} />
        <Block>
          {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
          <WebName data={web} />
          {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
          <WebPosts data={web} />
          <Row>
            <DeleteWeb id={web.id} />
          </Row>
        </Block>
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
        draftName
        ...EditMainNav
        ...WebName
        ...WebPosts
      }
    }
  `,
);
