import React from 'react';
import { connect } from 'react-redux';

import { createRoom } from '../../common/chatx/actions';
import { fields } from '../../common/lib/redux-fields';
import { Button, Input, Form } from '../app/components';


let NewRoom = ({ createRoom, fields }) => {
  const onSubmit = () => {
    if (!fields.roomName.value.trim()) return;
    createRoom(fields.roomName.value);
    fields.$reset();
  };
  return (
    <Form small onSubmit={onSubmit}>
      <Input
        {...fields.roomName}
        label=""
        placeholder="new room name.."
      />
    <Button type="submit" >Create</Button>
    </Form>
  );
};


NewRoom.propTypes = {
  createRoom: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
};

NewRoom = fields(NewRoom, {
  path: 'chatx.newRoom',
  fields: ['roomName'],
});

export default connect(null, { createRoom })(NewRoom);
