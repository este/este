// @flow
import * as React from 'react';
import { graphql } from 'react-relay';
import { DeleteButton } from '../core/buttons';
import withMutation, { type Commit } from '../core/withMutation';
import withConfirm, { type Confirm } from '../core/withConfirm';
import * as generated from './__generated__/DeleteWebMutation.graphql';
import Router from 'next/router';
import type { Href } from '../app/sitemap';
import { pipe } from 'ramda';

type DeleteWebProps = {|
  id: string,
  confirm: Confirm,
  commit: Commit<generated.DeleteWebInput, generated.DeleteWebMutationResponse>,
  pending: boolean,
|};

class DeleteWeb extends React.PureComponent<DeleteWebProps> {
  handleCompleted = ({ deleteWeb }) => {
    const id = deleteWeb && deleteWeb.web && deleteWeb.web.id;
    if (id == null) return;
    const href: Href = {
      pathname: '/',
    };
    Router.replace(href);
  };

  handleOnPress = () => {
    if (!this.props.confirm()) return;
    const input = { id: this.props.id };
    this.props.commit(input, this.handleCompleted);
  };

  render() {
    return (
      <DeleteButton
        color="danger"
        disabled={this.props.pending}
        onPress={this.handleOnPress}
      />
    );
  }
}

export default pipe(
  withConfirm,
  withMutation(
    graphql`
      mutation DeleteWebMutation($input: DeleteWebInput!) {
        deleteWeb(input: $input) {
          web {
            id
          }
        }
      }
    `,
  ),
)(DeleteWeb);
