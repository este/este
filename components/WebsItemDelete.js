// @flow
import * as React from 'react';
import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import AreYouSureConfirm from './core/AreYouSureConfirm';
import { DeleteButton } from './core/buttons';
import withMutation, { type Commit, type Errors } from './core/withMutation';
import * as generated from './__generated__/WebsItemDeleteMutation.graphql';

type DeleteProps = {|
  commit: Commit<
    generated.DeleteWebInput,
    generated.WebsItemDeleteMutationResponse,
  >,
  id: string,
  pending: boolean,
|};

class Delete extends React.PureComponent<DeleteProps> {
  render() {
    return (
      <AreYouSureConfirm>
        {confirm => (
          <DeleteButton
            inline
            color="warning"
            // disabled={pending}
            onPress={() => {
              if (!confirm()) return;
              const input = { id: this.props.id };
              this.props.commit(input);
            }}
            size={-1}
          />
        )}
      </AreYouSureConfirm>
    );
  }
}

const sharedUpdater = (store, id) => {
  const connection = ConnectionHandler.getConnection(
    store.get('client:root'),
    'Webs_webs',
  );
  ConnectionHandler.deleteNode(connection, id);
};

export default withMutation(
  Delete,
  graphql`
    mutation WebsItemDeleteMutation($input: DeleteWebInput!) {
      deleteWeb(input: $input) {
        id
      }
    }
  `,
  {
    updater: store => {
      const payload = store.getRootField('deleteWeb');
      if (!payload) return;
      const id = payload.getValue('id');
      sharedUpdater(store, id);
    },
  },
);
