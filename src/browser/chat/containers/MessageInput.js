import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fields } from '../../../common/lib/redux-fields';

import { Form, Box, Flex, Input, Button } from '../../app/components';
import { sendMessage } from '../../../common/chat/actions';

let MessageInput = ({ sendMessage, fields, selectedRoomId, viewer }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    const content = fields.content.value.trim();
    if (!content) return;

    sendMessage({
      content,
      roomId: selectedRoomId,
      sender: viewer,
    });

    fields.$reset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Box px={2} py={2}>
        <Flex>
          <Box auto>
            <Input
              {...fields.content}
              label="Message"
              placeholder="Enter your message ..."
              hideLabel
              mb={0}
              rounded="left"
          />
          </Box>
          <Button rounded="right">
            Send
          </Button>
        </Flex>
      </Box>
    </Form>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  selectedRoomId: PropTypes.string.isRequired,
  viewer: PropTypes.object.isRequired,
  fields: React.PropTypes.object.isRequired,
};

MessageInput = fields(MessageInput, {
  path: 'newMessage',
  fields: ['content'],
});

const mapStateToProps = ({ chat, users }) => {
  const { selectedRoomId } = chat;
  const { viewer } = users;

  return {
    selectedRoomId,
    viewer,
  };
};

const mapDispatchToProps = {
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
