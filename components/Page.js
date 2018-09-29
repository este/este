// @flow
import * as React from 'react';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import type { Page as Data } from './__generated__/Page.graphql';
import { createFragmentContainer, graphql } from 'react-relay';
import PageTitle from './PageTitle';
import A from './core/A';
import Block from './core/Block';
import Row from './core/Row';

type PageProps = {|
  data: Data,
|};

class Page extends React.PureComponent<PageProps> {
  render() {
    const { page } = this.props.data;
    if (page == null) return null;
    // https://github.com/relayjs/eslint-plugin-relay/issues/35
    // eslint-disable-next-line no-unused-expressions
    page.title;
    // page.id
    return (
      <>
        <Head>
          <title>{page.draftTitle}</title>
        </Head>
        <Row>
          {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
          <PageTitle data={page} />
        </Row>
        <Block>
          <Row>
            <A href={{ pathname: '/editor', query: { id: page.id } }} prefetch>
              <FormattedMessage defaultMessage="Edit" id="link.edit" />
            </A>
          </Row>
        </Block>
      </>
    );
  }
}

export default createFragmentContainer(
  Page,
  graphql`
    fragment Page on Query @argumentDefinitions(id: { type: "ID!" }) {
      page(id: $id) {
        id
        title @__clientField(handle: "draft")
        draftTitle
        ...PageTitle
      }
    }
  `,
);
