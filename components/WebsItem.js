// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import AreYouSureConfirm from './core/AreYouSureConfirm';
import Box from './core/Box';
import * as generated from './__generated__/WebsItem.graphql';
import { DeleteButton } from './core/buttons';
import Text from './core/Text';
import A from './core/A';
import { FormattedRelative } from 'react-intl';
import Mutation, { clientMutationId } from './core/Mutation';
import DeleteWebMutation from '../mutations/DeleteWebMutation';

const DeleteWeb = ({ id }) => (
  <Mutation>
    {({ mutate, pending }) => (
      <AreYouSureConfirm>
        {confirm => (
          <DeleteButton
            color="warning"
            disabled={pending}
            onPress={() => {
              if (!confirm()) return;
              const variables = {
                input: { id, clientMutationId: clientMutationId() },
              };
              mutate(DeleteWebMutation.commit, variables);
            }}
            paddingHorizontal={0}
            size={-1}
          />
        )}
      </AreYouSureConfirm>
    )}
  </Mutation>
);

type WebsItemProps = {|
  data: generated.WebsItem,
|};

class WebsItem extends React.PureComponent<WebsItemProps> {
  render() {
    const { data } = this.props;
    return (
      <Box>
        <Text>{data.name}</Text>
        <Text color="gray" size={-1}>
          <A href={{ pathname: '/edit', query: { domain: data.domain } }}>
            {data.domain}
          </A>
          {', '}
          <FormattedRelative value={data.updatedAt} />
          <Text>
            {', '}
            <DeleteWeb id={data.id} />
          </Text>
        </Text>
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
