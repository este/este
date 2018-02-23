// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import AreYouSureConfirm from './AreYouSureConfirm';
import Box from './Box';
import * as generated from './__generated__/WebsItem.graphql';
import { DeleteButton } from './buttons';
import Text from './Text';
import Set from './Set';
import A from './A';
import { FormattedRelative } from 'react-intl';
import Mutation, { clientMutationId } from './Mutation';
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
            <Text>
              {', '}
              <DeleteWeb id={data.id} />
            </Text>
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
