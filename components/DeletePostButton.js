// @flow
import { connect } from 'react-redux';
// TODO: Use Delete button
import Button from '../components/Button';

const DeletePostButton = () =>
  <Button
    color="warning"
    marginVertical={0}
    onPress={() => {
      // dispatch({ type: 'DELETE_POST' });
    }}
    paddingHorizontal={0}
    size={-1}
  >
    delete
  </Button>;

export default DeletePostButton;
