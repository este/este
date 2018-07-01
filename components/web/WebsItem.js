// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebsItem.graphql';
import Text from '../core/Text';
import A from '../core/A';
import Block from '../core/Block';
import { FormattedRelative } from 'react-intl';

type WebsItemProps = {|
  data: generated.WebsItem,
|};

class WebsItem extends React.PureComponent<WebsItemProps> {
  render() {
    const { data } = this.props;
    const id = data.posts && data.posts[0].id;
    // Without a page, there is nothing to edit.
    if (id == null) return null;
    return (
      <Block>
        <A href={{ pathname: '/post', query: { id } }} prefetch>
          {data.name}
        </A>
        <Text color="gray" size={-1}>
          <FormattedRelative value={data.updatedAt} />
        </Text>
      </Block>
    );
  }
}

export default createFragmentContainer(
  WebsItem,
  graphql`
    fragment WebsItem on Web {
      name
      updatedAt
      posts(first: 1, orderBy: updatedAt_DESC) {
        id
      }
    }
  `,
);
