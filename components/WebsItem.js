// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import AreYouSureConfirm from './core/AreYouSureConfirm';
import * as generated from './__generated__/WebsItem.graphql';
import { DeleteButton } from './core/buttons';
import Text from './core/Text';
import A from './core/A';
import P from './core/P';
import { FormattedRelative } from 'react-intl';
import Mutation, { clientMutationId } from './core/Mutation';
import DeleteWebMutation from '../mutations/DeleteWebMutation';
import { View } from 'react-native';

const DeleteWeb = ({ id }) => (
  <Mutation>
    {({ mutate, pending }) => (
      <AreYouSureConfirm>
        {confirm => (
          <DeleteButton
            inline
            color="warning"
            disabled={pending}
            onPress={() => {
              if (!confirm()) return;
              const variables = {
                input: { id, clientMutationId: clientMutationId() },
              };
              mutate(DeleteWebMutation.commit, variables);
            }}
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
      <View>
        <Text>{data.name}</Text>
        <P>
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
        </P>
      </View>
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
