// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebPostsItem.graphql';
import Text from './core/Text';
import A from './core/A';
import Row from './core/Row';
import Block from './core/Block';
import { FormattedRelative } from 'react-intl';

type WebPostsItemProps = {|
  data: generated.WebPostsItem,
|};

class WebPostsItem extends React.PureComponent<WebPostsItemProps> {
  render() {
    const {
      data: { id, name, updatedAt },
    } = this.props;
    return (
      <Block>
        <Row>
          <A href={{ pathname: '/post', query: { id } }} prefetch>
            {name}
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
  WebPostsItem,
  graphql`
    fragment WebPostsItem on Post {
      id
      name
      updatedAt
    }
  `,
);
