import React from 'react';
import { fields } from '../../common/lib/redux-fields';
import {
  ButtonOutline,
  Input,
  Form,
  Flex,
  Box,
} from '../app/components';


const MessageBox = ({ onNewMessage, fields }) => {
  const onSubmit = () => {
    if (!fields.newMessage.value.trim()) return;
    onNewMessage(fields.newMessage.value);
    fields.$reset();
  };

  return (
    <Flex>
      <Form onSubmit={onSubmit}>
        <Box auto>
          <Input
            {...fields.newMessage}
            label="new_message"
            placeholder="Send message.."
            hideLabel
            mb={0}
            rounded="left"
          />
        </Box>
        <ButtonOutline
          type="submit"
          rounded="right"
          children="Send"
        />
      </Form>
    </Flex>
  );
};

MessageBox.propTypes = {
  onNewMessage: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
};

export default fields(MessageBox, {
  path: 'chatx.newMessage',
  fields: ['newMessage'],
});
