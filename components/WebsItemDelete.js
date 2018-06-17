// @flow
import * as React from 'react';
import { graphql } from 'react-relay';
import { ConnectionHandler, ROOT_ID } from 'relay-runtime';
import { DeleteButton } from './core/buttons';
import withMutation, { type Commit } from './core/withMutation';
import withConfirm, { type Confirm } from './core/withConfirm';
import * as generated from './__generated__/WebsItemDeleteMutation.graphql';

type DeleteProps = {|
  id: string,
  confirm: Confirm,
  commit: Commit<
    generated.DeleteWebInput,
    generated.WebsItemDeleteMutationResponse,
  >,
  pending: boolean,
|};

class Delete extends React.PureComponent<DeleteProps> {
  handleOnPress = () => {
    if (!this.props.confirm()) return;
    const input = { id: this.props.id };
    this.props.commit(input);
  };

  render() {
    return (
      <DeleteButton
        inline
        color="warning"
        disabled={this.props.pending}
        onPress={this.handleOnPress}
        size={-1}
      />
    );
  }
}

const sharedUpdater = (store, id) => {
  const connection = ConnectionHandler.getConnection(
    store.get(ROOT_ID),
    'Webs_webs',
  );
  ConnectionHandler.deleteNode(connection, id);
};

export default withMutation(
  withConfirm(Delete),
  graphql`
    mutation WebsItemDeleteMutation($input: DeleteWebInput!) {
      deleteWeb(input: $input) {
        id
      }
    }
  `,
  {
    updater(store) {
      const payload = store.getRootField('deleteWeb');
      if (!payload) return;
      const id = payload.getValue('id');
      sharedUpdater(store, id);
    },
  },
);
