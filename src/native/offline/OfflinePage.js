import React from 'react';
import { CenteredContainer, Text } from '../app/components';
import { connect } from 'react-redux';

class OfflinePage extends React.Component {

  static propTypes = {
    online: React.PropTypes.bool.isRequired,
  };

  render() {
    const { online } = this.props;

    return (
      <CenteredContainer>
        <Text>state.app.online: {online.toString()}</Text>
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
