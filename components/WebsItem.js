// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Box from './Box';
import * as generated from './__generated__/WebsItem.graphql';
import Text from './Text';
import Set from './Set';
import A from './A';
import { FormattedRelative } from 'react-intl';

type Props = {|
  data: generated.WebsItem,
|};

class WebsItem extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;
    return (
      <Box>
        <Text>{data.name}</Text>
        <Set>
          <Text color="gray" size={-1}>
            <A href={{ pathname: '/edit', query: { domain: data.domain } }}>
              {data.domain}
            </A>
            {', '}
            <FormattedRelative value={data.updatedAt} />
            {/* <Text>
              {', '}
              <DeleteWeb
                disabled={this.state.pending}
                onPress={this.deleteWeb(mutate)}
              />
            </Text> */}
          </Text>
        </Set>
      </Box>
    );
  }
}

export default createFragmentContainer(
  WebsItem,
  graphql`
    fragment WebsItem on Web {
      updatedAt
      name
      domain
      id
    }
  `,
);
