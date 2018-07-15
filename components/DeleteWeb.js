// @flow
import * as React from 'react';
import { DeleteButton } from './core/buttons';
import withMutation from './core/withMutation';
import withConfirm, { type Confirm } from './core/withConfirm';
import Router from 'next/router';
import type { Href } from './app/sitemap';
import { pipe } from 'ramda';
import DeleteWebMutation, {
  type DeleteWebCommit,
} from '../mutations/DeleteWebMutation';

type DeleteWebProps = {|
  id: string,
  confirm: Confirm,
  commit: DeleteWebCommit,
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
  withMutation(DeleteWebMutation),
)(DeleteWeb);
