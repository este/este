// @flow
import type { Dispatch, Id, State } from '../types';
import { DeleteButton } from './buttons';
import { connect, type Connector } from 'react-redux';
import { temp } from '../lib/temp';

type DeletePostButtonOwnProps = {
  id: Id,
  viewerId: Id,
};

type DeletePostButtonProps = DeletePostButtonOwnProps & {
  dispatch: Dispatch,
  form: *,
};

const DeletePostButton = ({ form, id, viewerId, dispatch }) => {
  const deletePost = () => dispatch({ type: 'DELETE_POST', id, viewerId });
  return (
    <DeleteButton
      disabled={temp(form.disabled)}
      color="warning"
      marginVertical={0}
      onPress={deletePost}
      paddingHorizontal={0}
      size={-1}
    />
  );
};

const connector: Connector<
  DeletePostButtonOwnProps,
  DeletePostButtonProps,
> = connect(({ posts: { form } }: State, { id }) => ({
  form: form.changed[id] || form.initial,
}));

export default connector(DeletePostButton);
