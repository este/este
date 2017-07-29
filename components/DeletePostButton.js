// @flow
import type { Environment, Id } from '../types';
import DeletePostMutation from '../mutations/DeletePostMutation';
import { DeleteButton } from './buttons';

type DeletePostButtonProps = {
  environment: Environment,
  id: Id,
  viewerId: Id,
};

// Note we don't have to handle async action via Redux with observables if
// the mutation is optimistic. Great not only for UX but DX as well.
const DeletePostButton = ({
  environment,
  id,
  viewerId,
}: DeletePostButtonProps) =>
  <DeleteButton
    color="warning"
    marginVertical={0}
    onPress={() => DeletePostMutation.commit(environment, viewerId, id)}
    paddingHorizontal={0}
    size={-1}
  />;

// TODO: Create and use environment HOC once Flow reveal how to type it. Soon!
export default DeletePostButton;
