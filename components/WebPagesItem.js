// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { WebPagesItem as Data } from './__generated__/WebPagesItem.graphql';
import Text from './core/Text';
import A from './core/A';
import Row from './core/Row';
import Block from './core/Block';
import { FormattedRelative } from 'react-intl';

type WebPagesItemProps = {|
  data: Data,
|};

class WebPagesItem extends React.PureComponent<WebPagesItemProps> {
  render() {
    const {
      data: { id, title, updatedAt },
    } = this.props;
    return (
      <Block>
        <Row>
          <A href={{ pathname: '/editor', query: { id } }} prefetch>
            {title}
          </A>
        </Row>
        <Text color="gray" size={-1}>
          <FormattedRelative value={updatedAt} />
        </Text>
      </Block>
    );
  }
}

export default createFragmentContainer(
  WebPagesItem,
  graphql`
    fragment WebPagesItem on Page {
      id
      title
      updatedAt
    }
  `,
);
