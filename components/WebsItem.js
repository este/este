// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebsItem.graphql';
import Text from './core/Text';
import A from './core/A';
import Block from './core/Block';
import Row from './core/Row';
import { FormattedRelative } from 'react-intl';

type WebsItemProps = {|
  data: generated.WebsItem,
|};

class WebsItem extends React.PureComponent<WebsItemProps> {
  render() {
    const { data } = this.props;
    return (
      <Block>
        <Row>
          <A href={{ pathname: '/web', query: { id: data.id } }} prefetch>
            {data.name}
          </A>
        </Row>
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
      id
    }
  `,
);
