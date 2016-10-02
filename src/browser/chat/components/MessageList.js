import React, { Component, PropTypes } from 'react';

import { View } from '../../app/components';

import Message from './Message';

const boxStyle = {
  height: '220px',
  overflowY: 'scroll',
};

class MessageList extends Component {

  static propTypes = {
    messages: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    this.scrollDown();
  }

  getSortedList() {
    return this.props.messages.toList().sortBy(message => message.sentTime);
  }

  scrollDown() {
    this.viewNode.scrollTop = this.viewNode.scrollHeight;
  }

  render() {
    return (
      <div style={boxStyle} ref={node => { this.viewNode = node; }}>
        <View>
          {this.getSortedList().map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </View>
      </div>
    );
  }
}


export default MessageList;
