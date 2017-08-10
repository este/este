// @flow
import type { Environment, Id } from '../types';
import AreYouSureConfirm from './AreYouSureConfirm';
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
  <AreYouSureConfirm
    render={confirm =>
      <DeleteButton
        color="warning"
        marginVertical={0}
        onPress={() => {
          if (!confirm()) return;
          // TODO: Not sure what to do on error. It can be caused by stale
          // client data or app bug. Should we rerender page? Or move it to epic
          // and render special error message? Per case or global?
          // https://github.com/este/este/issues/1381
          DeletePostMutation.commit(environment, viewerId, id);
        }}
        paddingHorizontal={0}
        size={-1}
      />}
  />;

// TODO: Create and use environment HOC once Flow reveal how to type it. Soon!
export default DeletePostButton;
